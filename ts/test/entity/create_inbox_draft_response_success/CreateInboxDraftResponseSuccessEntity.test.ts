

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


describe('CreateInboxDraftResponseSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RESEND_TEST_LIVE=TRUE.
  afterEach(liveDelay('RESEND_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ResendSDK.test()
    const ent = testsdk.CreateInboxDraftResponseSuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ResendSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreateInboxDraftResponseSuccess().create({"inbox_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RESEND_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_inbox_draft_response_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"sh":"Files to store on the draft.","t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"attachments","index$":0},"bcc":{"a":true,"h":"Bcc","n":"bcc","r":false,"sh":"The BCC recipients.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"bcc","index$":1},"cc":{"a":true,"h":"Cc","n":"cc","r":false,"sh":"The CC recipients.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"cc","index$":2},"html":{"a":true,"h":"Html","n":"html","r":false,"sh":"The HTML body.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"html","index$":3},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The ID of the draft.","t":"`$STRING`","key$":"id","index$":4},"object":{"a":true,"h":"Object","n":"object","r":true,"sh":"Type of the response object.","t":"`$STRING`","key$":"object","index$":5},"reply_to_email_id":{"a":true,"fo":"uuid","h":"Reply To Email Id","n":"reply_to_email_id","r":false,"sh":"The Email ID to reply to, as returned in `data[].id` by the list thread emails endpoint.","t":"`$STRING`","key$":"reply_to_email_id","index$":6},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"sh":"The subject.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject","index$":7},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"The plain text body.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"text","index$":8},"thread_id":{"a":true,"fo":"uuid","h":"Thread Id","n":"thread_id","r":false,"sh":"The Thread ID to reply in.","t":"`$STRING`","key$":"thread_id","index$":9},"to":{"a":true,"h":"To","n":"to","r":false,"sh":"The recipients.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"to","index$":10}},"id":{"field":"id","name":"id"},"name":"create_inbox_draft_response_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["attachments","bcc","cc","html","reply_to_email_id","subject","text","thread_id","to"],"co":{"id":"POST /inboxes/{inbox_id}/drafts","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","k":"param","n":"inbox_id","or":"inbox_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/inboxes/{inbox_id}/drafts","q":{"exist":["inbox_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"drafts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.inbox"]]},"key$":"create_inbox_draft_response_success","name__orig":"create_inbox_draft_response_success","Name":"CreateInboxDraftResponseSuccess","name_":"create_inbox_draft_response_success","name-":"create-inbox-draft-response-success","NAME":"CREATE_INBOX_DRAFT_RESPONSE_SUCCESS","index$":18}, {"active":true,"entity":"create_inbox_draft_response_success","key$":"BasicCreateInboxDraftResponseSuccessFlow","kind":"basic","name":"BasicCreateInboxDraftResponseSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_inbox_draft_response_success_ref01"},"m":{"inbox_id":"inbox01"},"o":"create","s":[],"v":[]}]}, 'CreateInboxDraftResponseSuccess', {"POST /inboxes/{inbox_id}/drafts":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one of `to`, `cc`, `bcc`, `subject`, `text`, `html` or `attachments` must be non-empty. The combined recipients of `to`, `cc` and `bcc` cannot exceed 50. `thread_id` and `reply_to_email_id` must be sent together or not at all.","properties":{"to":{"description":"The recipients. For multiple addresses, send an array of strings. Each value can include a friendly name, for example `Ada Lovelace <ada@example.org>`. Each address is `email@example.com` or `Name <email@example.com>`. An address that is not valid returns a 422.","oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"},"maxItems":50},{"type":"null"}],"example":["ada@example.org"],"key$":"to"},"cc":{"description":"The CC recipients. For multiple addresses, send an array of strings. Each address is `email@example.com` or `Name <email@example.com>`. An address that is not valid returns a 422.","oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"},"maxItems":50},{"type":"null"}],"key$":"cc"},"bcc":{"description":"The BCC recipients. For multiple addresses, send an array of strings. Each address is `email@example.com` or `Name <email@example.com>`. An address that is not valid returns a 422.","oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"},"maxItems":50},{"type":"null"}],"key$":"bcc"},"subject":{"type":["string","null"],"minLength":1,"maxLength":2000,"description":"The subject. Max 2000 characters. A string that is only whitespace, or that contains a line break, is rejected.","example":"Refund for order 1041","key$":"subject"},"html":{"type":["string","null"],"description":"The HTML body.","example":"<p>Refund issued for order 1041.</p>","key$":"html"},"text":{"type":["string","null"],"description":"The plain text body.","example":"Refund issued for order 1041.","key$":"text"},"attachments":{"type":["array","null"],"description":"Files to store on the draft. Each one needs a `filename` and either `content` or a `path` URL. A `path` file is downloaded when the request is made and stored on the draft. When both are sent, `path` is ignored. A `content_id` returns a 422. The files on a draft, downloaded ones included, can total at most 25 MB. A `path` that does not start with `http` or `https`, or that cannot be downloaded, returns a 422, and so does a request whose downloads take more than 20 seconds together. An empty file or a blocked file type returns a 422.","items":{"type":"object","description":"A file to store on a draft. Send either `content` or a `path` URL. Unlike `POST /emails` attachments, a `path` file is downloaded when the request is made, not when the draft is sent, and a draft attachment cannot use `content_id`. When both `content` and `path` are sent, `path` is ignored.","required":["filename"],"properties":{"content":{"type":"string","description":"The content of the file, encoded in base64. It cannot be empty. Required without `path`.","example":"aGVsbG8gZTJl"},"path":{"type":"string","description":"A URL to download the file from, starting with `http` or `https`. Required without `content`. A file that cannot be downloaded returns a 422, and so does a request whose downloads take more than 20 seconds together.","example":"https://example.com/invoice.pdf"},"filename":{"type":"string","minLength":1,"description":"The filename of the attachment. A blocked file type returns a 422.","example":"receipt.pdf"},"content_type":{"type":"string","minLength":1,"description":"The MIME type of the attachment. It must be a valid MIME type, such as `application/pdf`, or the request returns a 422. Required with `content`. With `path`, it defaults to the content type of the downloaded file.","example":"application/pdf"}},"x-ref":"#/components/schemas/InboxDraftAttachmentInput"},"key$":"attachments"},"thread_id":{"type":"string","format":"uuid","description":"The Thread ID to reply in. Must be sent with `reply_to_email_id`.","example":"4d8e2a1c-9b3f-4c6d-8a21-3e5f7c9c0d12","key$":"thread_id"},"reply_to_email_id":{"type":"string","format":"uuid","description":"The Email ID to reply to, as returned in `data[].id` by the list thread emails endpoint. Must be sent with `thread_id`.","example":"5b1a9f47-2c8d-4e6f-9a03-1d2e3f4a5b60","key$":"reply_to_email_id"}},"x-ref":"#/components/schemas/CreateInboxDraftOptions","index$":1}}}},"parameters":[{"in":"header","name":"Idempotency-Key","required":false,"schema":{"type":"string","minLength":1,"maxLength":256},"description":"A unique key for the request, so the draft is created only once. A retry with the same key within 24 hours returns the first successful (2xx) response, with the `idempotent-replayed: true` header. A failed request is not stored, so it can be retried with the same key. Reusing the key with a different body, or while the first request is still running, returns a 409. An empty key, or one longer than 256 characters, returns a 400 `invalid_idempotency_key`. [Learn more](https://resend.com/docs/dashboard/emails/idempotency-keys)","index$":0},{"in":"path","name":"inbox_id","required":true,"schema":{"type":"string"},"description":"The Inbox ID or the inbox email address, such as `support@acme.com`. A value that contains `@` must be a valid email address, and any other value must be a UUID, or the request returns a 422. The address match is case-insensitive and never falls back to the inbox `name`. An address that matches no inbox returns a 404.","example":"b3e2b2b6-3f0e-4c8e-9ad3-2f43a1e2c7f1","x-ref":"#/components/parameters/InboxIdOrEmailAddress","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"create_inbox_draft_response_success.create.0":"GET-only live run: needs POST /inboxes/{inbox_id}/drafts"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_inbox_draft_response_success_ref01_ent = client.CreateInboxDraftResponseSuccess()
    let create_inbox_draft_response_success_ref01_data = setup.data.new.create_inbox_draft_response_success['create_inbox_draft_response_success_ref01']
    create_inbox_draft_response_success_ref01_data['inbox_id'] = setup.idmap['inbox01']

    create_inbox_draft_response_success_ref01_data = (await create_inbox_draft_response_success_ref01_ent.create(create_inbox_draft_response_success_ref01_data)).data()
    assert(null != create_inbox_draft_response_success_ref01_data.id)


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
      '../../../../.sdk/test/entity/create_inbox_draft_response_success/CreateInboxDraftResponseSuccessTestData.json')

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
    ['create_inbox_draft_response_success01','create_inbox_draft_response_success02','create_inbox_draft_response_success03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RESEND_TEST_CREATE_INBOX_DRAFT_RESPONSE_SUCCESS_ENTID': idmap,
    'RESEND_TEST_LIVE': 'FALSE',
    'RESEND_TEST_EXPLAIN': 'FALSE',
    'RESEND_APIKEY': '',
  })

  idmap = env['RESEND_TEST_CREATE_INBOX_DRAFT_RESPONSE_SUCCESS_ENTID']

  const live = 'TRUE' === env.RESEND_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RESEND_TEST_CREATE_INBOX_DRAFT_RESPONSE_SUCCESS_ENTID']
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
  
