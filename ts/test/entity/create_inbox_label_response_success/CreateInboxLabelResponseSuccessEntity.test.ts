

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


describe('CreateInboxLabelResponseSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RESEND_TEST_LIVE=TRUE.
  afterEach(liveDelay('RESEND_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ResendSDK.test()
    const ent = testsdk.CreateInboxLabelResponseSuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ResendSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreateInboxLabelResponseSuccess().create({"inbox_id":1,"name":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RESEND_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_inbox_label_response_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"color":{"a":true,"h":"Color","n":"color","r":false,"sh":"The color of the label, as a `#RRGGBB` hex color.","t":"`$STRING`","key$":"color","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the label.","t":"`$STRING`","key$":"name","index$":1}},"name":"create_inbox_label_response_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["color","name"],"co":{"id":"POST /inboxes/{inbox_id}/labels","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","k":"param","n":"inbox_id","or":"inbox_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/inboxes/{inbox_id}/labels","q":{"exist":["inbox_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"labels"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.inbox"]]},"key$":"create_inbox_label_response_success","name__orig":"create_inbox_label_response_success","Name":"CreateInboxLabelResponseSuccess","name_":"create_inbox_label_response_success","name-":"create-inbox-label-response-success","NAME":"CREATE_INBOX_LABEL_RESPONSE_SUCCESS","index$":19}, {"active":true,"entity":"create_inbox_label_response_success","key$":"BasicCreateInboxLabelResponseSuccessFlow","kind":"basic","name":"BasicCreateInboxLabelResponseSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_inbox_label_response_success_ref01"},"m":{"inbox_id":"inbox01"},"o":"create","s":[],"v":[]}]}, 'CreateInboxLabelResponseSuccess', {"POST /inboxes/{inbox_id}/labels":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name"],"properties":{"name":{"type":"string","minLength":1,"maxLength":64,"description":"The name of the label. Max 64 characters. Leading and trailing whitespace is trimmed. Must not match another label on the inbox, compared without case.","example":"Urgent","key$":"name"},"color":{"type":"string","pattern":"^#[0-9A-Fa-f]{6}$","description":"The color of the label, as a `#RRGGBB` hex color. It is stored in uppercase. When omitted, a random color from the dashboard palette is used.","example":"#E93D82","key$":"color"}},"x-ref":"#/components/schemas/CreateInboxLabelOptions","index$":1}}}},"parameters":[{"in":"path","name":"inbox_id","required":true,"schema":{"type":"string"},"description":"The Inbox ID or the inbox email address, such as `support@acme.com`. A value that contains `@` must be a valid email address, and any other value must be a UUID, or the request returns a 422. The address match is case-insensitive and never falls back to the inbox `name`. An address that matches no inbox returns a 404.","example":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","x-ref":"#/components/parameters/InboxIdOrEmailAddress","index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"create_inbox_label_response_success.create.0":"GET-only live run: needs POST /inboxes/{inbox_id}/labels"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_inbox_label_response_success_ref01_ent = client.CreateInboxLabelResponseSuccess()
    let create_inbox_label_response_success_ref01_data = setup.data.new.create_inbox_label_response_success['create_inbox_label_response_success_ref01']
    create_inbox_label_response_success_ref01_data['inbox_id'] = setup.idmap['inbox01']

    create_inbox_label_response_success_ref01_data = (await create_inbox_label_response_success_ref01_ent.create(create_inbox_label_response_success_ref01_data)).data()
    assert(null != create_inbox_label_response_success_ref01_data)


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
      '../../../../.sdk/test/entity/create_inbox_label_response_success/CreateInboxLabelResponseSuccessTestData.json')

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
    ['create_inbox_label_response_success01','create_inbox_label_response_success02','create_inbox_label_response_success03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RESEND_TEST_CREATE_INBOX_LABEL_RESPONSE_SUCCESS_ENTID': idmap,
    'RESEND_TEST_LIVE': 'FALSE',
    'RESEND_TEST_EXPLAIN': 'FALSE',
    'RESEND_APIKEY': '',
  })

  idmap = env['RESEND_TEST_CREATE_INBOX_LABEL_RESPONSE_SUCCESS_ENTID']

  const live = 'TRUE' === env.RESEND_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RESEND_TEST_CREATE_INBOX_LABEL_RESPONSE_SUCCESS_ENTID']
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
  
