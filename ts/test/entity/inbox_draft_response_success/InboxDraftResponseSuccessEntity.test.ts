

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


describe('InboxDraftResponseSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RESEND_TEST_LIVE=TRUE.
  afterEach(liveDelay('RESEND_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ResendSDK.test()
    const ent = testsdk.InboxDraftResponseSuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ResendSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.InboxDraftResponseSuccess().load({"draft_id":1,"inbox_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RESEND_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox_draft_response_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":true,"sh":"The files stored on the draft.","t":"`$ARRAY`","key$":"attachments","index$":0},"bcc":{"a":true,"h":"Bcc","n":"bcc","r":true,"sh":"The BCC recipients.","t":"`$ARRAY`","key$":"bcc","index$":1},"cc":{"a":true,"h":"Cc","n":"cc","r":true,"sh":"The CC recipients.","t":"`$ARRAY`","key$":"cc","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"Timestamp when the draft was created.","t":"`$STRING`","key$":"created_at","index$":3},"email_id":{"a":true,"fo":"uuid","h":"Email Id","n":"email_id","r":true,"sh":"The ID of the outbound email queued when the draft was sent.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"email_id","index$":4},"html":{"a":true,"h":"Html","n":"html","r":true,"sh":"The HTML body.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"html","index$":5},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The ID of the draft.","t":"`$STRING`","key$":"id","index$":6},"object":{"a":true,"h":"Object","n":"object","r":true,"sh":"The object type.","t":"`$STRING`","key$":"object","index$":7},"reply_to_email_id":{"a":true,"fo":"uuid","h":"Reply To Email Id","n":"reply_to_email_id","r":true,"sh":"The Email ID the draft replies to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"reply_to_email_id","index$":8},"subject":{"a":true,"h":"Subject","n":"subject","r":true,"sh":"The subject.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject","index$":9},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The plain text body.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"text","index$":10},"thread_id":{"a":true,"fo":"uuid","h":"Thread Id","n":"thread_id","r":true,"sh":"The Thread ID when the draft is a reply.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"thread_id","index$":11},"to":{"a":true,"h":"To","n":"to","r":true,"sh":"The recipients.","t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"to","index$":12},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"`reply` when the draft replies to an email in an existing thread.","t":"`$STRING`","key$":"type","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Timestamp when the draft was last saved.","t":"`$STRING`","key$":"updated_at","index$":14}},"id":{"field":"id","name":"id"},"name":"inbox_draft_response_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["headers"],"co":{"id":"POST /inboxes/{inbox_id}/drafts/{draft_id}/send","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"draft_id","or":"draft_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","k":"param","n":"inbox_id","or":"inbox_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/inboxes/{inbox_id}/drafts/{draft_id}/send","q":{"$action":"send","exist":["draft_id","inbox_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"drafts"},{"var":"draft_id"},{"lit":"send"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /inboxes/{inbox_id}/drafts/{draft_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"draft_id","or":"draft_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","k":"param","n":"inbox_id","or":"inbox_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/inboxes/{inbox_id}/drafts/{draft_id}","q":{"exist":["draft_id","inbox_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"drafts"},{"var":"draft_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.inbox"]]},"key$":"inbox_draft_response_success","name__orig":"inbox_draft_response_success","Name":"InboxDraftResponseSuccess","name_":"inbox_draft_response_success","name-":"inbox-draft-response-success","NAME":"INBOX_DRAFT_RESPONSE_SUCCESS","index$":28}, {"active":true,"entity":"inbox_draft_response_success","key$":"BasicInboxDraftResponseSuccessFlow","kind":"basic","name":"BasicInboxDraftResponseSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"inbox_draft_response_success_ref01"},"m":{"draft_id":"draft01","inbox_id":"inbox01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"inbox_draft_response_success_ref01","srcdatavar":"inbox_draft_response_success_ref01_data","suffix":"_dt0"},"m":{"id":"inbox_draft_response_success01","inbox_id":"inbox01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-inbox_draft_response_success_ref01"}}]}]}, 'InboxDraftResponseSuccess', {"POST /inboxes/{inbox_id}/drafts/{draft_id}/send":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"headers":{"type":["object","null"],"additionalProperties":{"type":"string"},"description":"Custom headers to add to the email. The `In-Reply-To`, `References` and `Reply-To` headers are set by Resend and cannot be set here. Sending one of them, in any letter case, returns a 422. Header names cannot be empty, and names and values cannot contain line breaks or null characters, or the request returns a 422. `null` means no custom headers.","example":{"X-Ticket-Id":"4821"}}},"x-ref":"#/components/schemas/SendInboxDraftOptions"}}}},"parameters":[{"in":"header","name":"Idempotency-Key","required":false,"schema":{"type":"string","minLength":1,"maxLength":256},"description":"A unique key for the request, so the draft is sent only once. A retry with the same key within 24 hours returns the first successful (2xx) response, with the `idempotent-replayed: true` header. A failed request is not stored, so it can be retried with the same key. Reusing the key with a different body, or while the first request is still running, returns a 409. An empty key, or one longer than 256 characters, returns a 400 `invalid_idempotency_key`. [Learn more](https://resend.com/docs/dashboard/emails/idempotency-keys)","index$":0},{"in":"path","name":"inbox_id","required":true,"schema":{"type":"string"},"description":"The Inbox ID or the inbox email address, such as `support@acme.com`. A value that contains `@` must be a valid email address, and any other value must be a UUID, or the request returns a 422. The address match is case-insensitive and never falls back to the inbox `name`. An address that matches no inbox returns a 404.","example":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","x-ref":"#/components/parameters/InboxIdOrEmailAddress","index$":1},{"name":"draft_id","in":"path","required":true,"schema":{"type":"string","format":"uuid"},"description":"The Draft ID.","index$":2}]},"GET /inboxes/{inbox_id}/drafts/{draft_id}":{"protocol":"http","parameters":[{"in":"path","name":"inbox_id","required":true,"schema":{"type":"string"},"description":"The Inbox ID or the inbox email address, such as `support@acme.com`. A value that contains `@` must be a valid email address, and any other value must be a UUID, or the request returns a 422. The address match is case-insensitive and never falls back to the inbox `name`. An address that matches no inbox returns a 404.","example":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","x-ref":"#/components/parameters/InboxIdOrEmailAddress","index$":0},{"name":"draft_id","in":"path","required":true,"schema":{"type":"string","format":"uuid"},"description":"The Draft ID.","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"inbox_draft_response_success.create.0":"GET-only live run: needs POST /inboxes/{inbox_id}/drafts/{draft_id}/send","inbox_draft_response_success.load.1":"GET-only live run: reads a record only inbox_draft_response_success.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const inbox_draft_response_success_ref01_ent = client.InboxDraftResponseSuccess()
    let inbox_draft_response_success_ref01_data = setup.data.new.inbox_draft_response_success['inbox_draft_response_success_ref01']
    inbox_draft_response_success_ref01_data['draft_id'] = setup.idmap['draft01']
    inbox_draft_response_success_ref01_data['inbox_id'] = setup.idmap['inbox01']

    inbox_draft_response_success_ref01_data = (await inbox_draft_response_success_ref01_ent.create(inbox_draft_response_success_ref01_data)).data()
    assert(null != inbox_draft_response_success_ref01_data.id)


    // LOAD
    const inbox_draft_response_success_ref01_match_dt0: any = {}
    inbox_draft_response_success_ref01_match_dt0.id = inbox_draft_response_success_ref01_data.id
    inbox_draft_response_success_ref01_match_dt0['inbox_id'] = setup.idmap['inbox_id'] ?? setup.idmap['inbox01']
    const inbox_draft_response_success_ref01_data_dt0 = (await inbox_draft_response_success_ref01_ent.load(inbox_draft_response_success_ref01_match_dt0)).data()
    assert(inbox_draft_response_success_ref01_data_dt0.id === inbox_draft_response_success_ref01_data.id)


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
      '../../../../.sdk/test/entity/inbox_draft_response_success/InboxDraftResponseSuccessTestData.json')

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
    ['inbox_draft_response_success01','inbox_draft_response_success02','inbox_draft_response_success03','inbox01','inbox02','inbox03','draft01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RESEND_TEST_INBOX_DRAFT_RESPONSE_SUCCESS_ENTID': idmap,
    'RESEND_TEST_LIVE': 'FALSE',
    'RESEND_TEST_EXPLAIN': 'FALSE',
    'RESEND_APIKEY': '',
  })

  idmap = env['RESEND_TEST_INBOX_DRAFT_RESPONSE_SUCCESS_ENTID']

  const live = 'TRUE' === env.RESEND_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RESEND_TEST_INBOX_DRAFT_RESPONSE_SUCCESS_ENTID']
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
  
