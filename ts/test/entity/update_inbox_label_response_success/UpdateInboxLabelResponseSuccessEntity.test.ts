

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ResendSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('UpdateInboxLabelResponseSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RESEND_TEST_LIVE=TRUE.
  afterEach(liveDelay('RESEND_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ResendSDK.test()
    const ent = testsdk.UpdateInboxLabelResponseSuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ResendSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UpdateInboxLabelResponseSuccess().update({"inbox_id":1,"label_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RESEND_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'update_inbox_label_response_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"color":{"a":true,"h":"Color","n":"color","r":false,"sh":"A new color for the label, as a `#RRGGBB` hex color.","t":"`$STRING`","key$":"color","index$":0},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The ID of the updated label.","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"A new name for the label.","t":"`$STRING`","key$":"name","index$":2},"object":{"a":true,"h":"Object","n":"object","r":true,"sh":"Type of the response object.","t":"`$STRING`","key$":"object","index$":3}},"id":{"field":"id","name":"id"},"name":"update_inbox_label_response_success","op":{"update":{"input":"data","name":"update","points":[{"a":true,"bf":["color","name"],"co":{"id":"PATCH /inboxes/{inbox_id}/labels/{label_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","k":"param","n":"inbox_id","or":"inbox_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"label_id","or":"label_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/inboxes/{inbox_id}/labels/{label_id}","q":{"exist":["inbox_id","label_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"labels"},{"var":"label_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.inbox"]]},"key$":"update_inbox_label_response_success","name__orig":"update_inbox_label_response_success","Name":"UpdateInboxLabelResponseSuccess","name_":"update_inbox_label_response_success","name-":"update-inbox-label-response-success","NAME":"UPDATE_INBOX_LABEL_RESPONSE_SUCCESS","index$":74}, {"active":true,"entity":"update_inbox_label_response_success","key$":"BasicUpdateInboxLabelResponseSuccessFlow","kind":"basic","name":"BasicUpdateInboxLabelResponseSuccessFlow","param":{},"step":[{"a":false,"d":{"inbox_id":"inbox01"},"i":{"ref":"update_inbox_label_response_success_ref01","srcdatavar":"update_inbox_label_response_success_ref01_data","suffix":"_up0","textfield":"color"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-update_inbox_label_response_success_ref01"}}],"v":[],"unreachable":true}]}, 'UpdateInboxLabelResponseSuccess', {"PATCH /inboxes/{inbox_id}/labels/{label_id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":64,"description":"A new name for the label. Max 64 characters. Leading and trailing whitespace is trimmed. Must not match another label on the inbox, compared without case.","example":"Billing","key$":"name"},"color":{"type":"string","pattern":"^#[0-9A-Fa-f]{6}$","description":"A new color for the label, as a `#RRGGBB` hex color. It is stored in uppercase.","example":"#F76B15","key$":"color"}},"x-ref":"#/components/schemas/UpdateInboxLabelOptions","index$":1}}}},"parameters":[{"in":"path","name":"inbox_id","required":true,"schema":{"type":"string"},"description":"The Inbox ID or the inbox email address, such as `support@acme.com`. A value that contains `@` must be a valid email address, and any other value must be a UUID, or the request returns a 422. The address match is case-insensitive and never falls back to the inbox `name`. An address that matches no inbox returns a 404.","example":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","x-ref":"#/components/parameters/InboxIdOrEmailAddress","index$":0},{"name":"label_id","in":"path","required":true,"schema":{"type":"string","format":"uuid"},"description":"The Label ID.","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"update_inbox_label_response_success.update.0":"GET-only live run: needs PATCH /inboxes/{inbox_id}/labels/{label_id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let update_inbox_label_response_success_ref01_data = Object.values(setup.data.existing.update_inbox_label_response_success)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/update_inbox_label_response_success/UpdateInboxLabelResponseSuccessTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ResendSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['update_inbox_label_response_success01','update_inbox_label_response_success02','update_inbox_label_response_success03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RESEND_TEST_UPDATE_INBOX_LABEL_RESPONSE_SUCCESS_ENTID': idmap,
    'RESEND_TEST_LIVE': 'FALSE',
    'RESEND_TEST_EXPLAIN': 'FALSE',
    'RESEND_APIKEY': '',
  })

  idmap = env['RESEND_TEST_UPDATE_INBOX_LABEL_RESPONSE_SUCCESS_ENTID']

  const live = 'TRUE' === env.RESEND_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RESEND_TEST_UPDATE_INBOX_LABEL_RESPONSE_SUCCESS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ResendSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.RESEND_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.RESEND_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
