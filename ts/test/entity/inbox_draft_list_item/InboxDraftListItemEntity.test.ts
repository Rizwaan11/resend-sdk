

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


describe('InboxDraftListItemEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RESEND_TEST_LIVE=TRUE.
  afterEach(liveDelay('RESEND_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ResendSDK.test()
    const ent = testsdk.InboxDraftListItem()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ResendSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.InboxDraftListItem().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RESEND_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox_draft_list_item.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":true,"sh":"The files stored on the draft.","t":"`$ARRAY`","key$":"attachments","index$":0},"bcc":{"a":true,"h":"Bcc","n":"bcc","r":true,"sh":"The BCC recipients.","t":"`$ARRAY`","key$":"bcc","index$":1},"cc":{"a":true,"h":"Cc","n":"cc","r":true,"sh":"The CC recipients.","t":"`$ARRAY`","key$":"cc","index$":2},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The ID of the draft.","t":"`$STRING`","key$":"id","index$":3},"reply_to_email_id":{"a":true,"fo":"uuid","h":"Reply To Email Id","n":"reply_to_email_id","r":true,"sh":"The Email ID the draft replies to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"reply_to_email_id","index$":4},"snippet":{"a":true,"h":"Snippet","n":"snippet","r":true,"sh":"A short preview of the body.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"snippet","index$":5},"subject":{"a":true,"h":"Subject","n":"subject","r":true,"sh":"The subject.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject","index$":6},"thread_id":{"a":true,"fo":"uuid","h":"Thread Id","n":"thread_id","r":true,"sh":"The Thread ID when the draft is a reply.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"thread_id","index$":7},"to":{"a":true,"h":"To","n":"to","r":true,"sh":"The recipients.","t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"to","index$":8},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"`reply` when the draft replies to an email in an existing thread.","t":"`$STRING`","key$":"type","index$":9},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Timestamp when the draft was last saved.","t":"`$STRING`","key$":"updated_at","index$":10}},"id":{"field":"id","name":"id"},"name":"inbox_draft_list_item","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /inboxes/{inbox_id}/drafts","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","k":"param","n":"id","or":"inbox_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"after","or":"after","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"before","or":"before","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/inboxes/{inbox_id}/drafts","q":{"$action":"drafts","exist":["id"]},"r":{"param":{"inbox_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"inboxes"},{"var":"id"},{"lit":"drafts"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"inbox_draft_list_item","name__orig":"inbox_draft_list_item","Name":"InboxDraftListItem","name_":"inbox_draft_list_item","name-":"inbox-draft-list-item","NAME":"INBOX_DRAFT_LIST_ITEM","index$":27}, {"active":true,"entity":"inbox_draft_list_item","key$":"BasicInboxDraftListItemFlow","kind":"basic","name":"BasicInboxDraftListItemFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"inbox_id":"inbox01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"inbox_draft_list_item_ref01"}}],"unreachable":true}]}, 'InboxDraftListItem', {"GET /inboxes/{inbox_id}/drafts":{"protocol":"http","parameters":[{"in":"path","name":"inbox_id","required":true,"schema":{"type":"string"},"description":"The Inbox ID or the inbox email address, such as `support@acme.com`. A value that contains `@` must be a valid email address, and any other value must be a UUID, or the request returns a 422. The address match is case-insensitive and never falls back to the inbox `name`. An address that matches no inbox returns a 404.","example":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","x-ref":"#/components/parameters/InboxIdOrEmailAddress","index$":0},{"in":"query","name":"limit","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"description":"Number of items to return.","x-ref":"#/components/parameters/PaginationLimit","index$":1},{"in":"query","name":"after","required":false,"schema":{"type":"string"},"description":"Return items after this cursor.","x-ref":"#/components/parameters/PaginationAfter","index$":2},{"in":"query","name":"before","required":false,"schema":{"type":"string"},"description":"Return items before this cursor.","x-ref":"#/components/parameters/PaginationBefore","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let inbox_draft_list_item_ref01_data = Object.values(setup.data.existing.inbox_draft_list_item)[0] as any

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
      '../../../../.sdk/test/entity/inbox_draft_list_item/InboxDraftListItemTestData.json')

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
    ['inbox_draft_list_item01','inbox_draft_list_item02','inbox_draft_list_item03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RESEND_TEST_INBOX_DRAFT_LIST_ITEM_ENTID': idmap,
    'RESEND_TEST_LIVE': 'FALSE',
    'RESEND_TEST_EXPLAIN': 'FALSE',
    'RESEND_APIKEY': '',
  })

  idmap = env['RESEND_TEST_INBOX_DRAFT_LIST_ITEM_ENTID']

  const live = 'TRUE' === env.RESEND_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RESEND_TEST_INBOX_DRAFT_LIST_ITEM_ENTID']
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
  
