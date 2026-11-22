"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { Modal } from "@/components";
import { recordVisitEvent } from "@/feature/visit/api";
import { useSendInquiry } from "../../api";
import {
  INQUIRY_LIMITS,
  INQUIRY_TYPES,
  type InquiryType,
} from "../../constants/inquiry";
import {
  Banner,
  Chip,
  Chips,
  Consent,
  Desc,
  Done,
  ErrorText,
  Eyebrow,
  Field,
  Form,
  Hint,
  Honeypot,
  Row,
  Submit,
  Title,
} from "./styles";

interface Values {
  type: InquiryType;
  name: string;
  email: string;
  title: string;
  message: string;
  consent: boolean;
  website: string;
}

type Errors = Partial<Record<"name" | "email" | "title" | "message" | "consent", string>>;
type Status = "idle" | "sending" | "done" | "error";

const EMPTY: Values = { type: "question", name: "", email: "", title: "", message: "", consent: false, website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "이름을 2자 이상 적어 주세요";
  if (!v.email.trim()) e.email = "답변 받을 이메일을 적어 주세요";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "이메일 형식이 올바르지 않아요";
  if (v.title.trim().length < 2) e.title = "제목을 적어 주세요";
  if (v.message.trim().length < INQUIRY_LIMITS.messageMin) e.message = `내용을 ${INQUIRY_LIMITS.messageMin}자 이상 적어 주세요`;
  if (!v.consent) e.consent = "답변을 위해 정보를 사용하는 것에 동의해 주세요";
  return e;
}

/** 문의 · 제안 보내기 (네이티브 dialog: ESC 닫기 · 포커스 가두기를 브라우저가 처리) */
export function InquiryDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const { mutateAsync: sendInquiry } = useSendInquiry();

  const errors = validate(values);
  const show = (k: keyof Errors) => (touched[k] ? errors[k] : undefined);
  const set = <K extends keyof Values>(k: K, v: Values[K]) => setValues((p) => ({ ...p, [k]: v }));
  const blur = (k: keyof Errors) => setTouched((p) => ({ ...p, [k]: true }));
  const typeInfo = INQUIRY_TYPES.find((t) => t.id === values.type)!;

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setStatus("idle");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setTouched({ name: true, email: true, title: true, message: true, consent: true });
    const first = (Object.keys(errors) as (keyof Errors)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // 스팸 봇이 숨은 칸을 채웠다면 성공한 척하고 보내지 않아요
    if (values.website) {
      setStatus("done");
      return;
    }
    setStatus("sending");
    try {
      await sendInquiry({ data: { type: values.type, name: values.name.trim(), email: values.email.trim(), title: values.title.trim(), message: values.message.trim(), website: values.website } });
      recordVisitEvent("inquiry-sent");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const id = (k: string) => `${uid}-${k}`;

  return (
    <Modal open={open} onClose={onClose} labelledBy={id("title")}>
        {status === "done" ? (
          <Done role="status">
            <span className="badge">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                <path d="M9 19.5l7 7L29 12" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3>잘 전달됐어요</h3>
            <p>
              남겨 주신 {values.email.trim()} 로 확인하는 대로 답장드릴게요.
            </p>
            <div className="actions">
              <button type="button" onClick={onClose}>닫기</button>
              <button type="button" onClick={reset}>하나 더 보내기</button>
            </div>
          </Done>
        ) : (
          <>
            <Eyebrow>CONTACT</Eyebrow>
            <Title id={id("title")}>문의 · 제안</Title>
            <Desc>궁금한 점이나 해보고 싶은 이야기를 편하게 남겨 주세요. 메일 대신 여기에 남기셔도 제가 바로 확인해요.</Desc>

            <Form ref={formRef} onSubmit={submit} noValidate>
              <div role="radiogroup" aria-label="종류">
                <Chips>
                  {INQUIRY_TYPES.map((t) => (
                    <Chip key={t.id}>
                      <input type="radio" name="type" value={t.id} checked={values.type === t.id} onChange={() => set("type", t.id)} />
                      <span>{t.label}</span>
                    </Chip>
                  ))}
                </Chips>
                <Hint>{typeInfo.hint}</Hint>
              </div>

              <Row>
                <Field>
                  <label htmlFor={id("name")}>이름</label>
                  <input id={id("name")} name="name" value={values.name} maxLength={INQUIRY_LIMITS.nameMax} autoComplete="name" placeholder="홍길동" aria-invalid={!!show("name")} aria-describedby={show("name") ? id("name-e") : undefined} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} />
                  {show("name") && <ErrorText id={id("name-e")}>{show("name")}</ErrorText>}
                </Field>
                <Field>
                  <label htmlFor={id("email")}>이메일</label>
                  <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" value={values.email} placeholder="name@example.com" aria-invalid={!!show("email")} aria-describedby={show("email") ? id("email-e") : undefined} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} />
                  {show("email") && <ErrorText id={id("email-e")}>{show("email")}</ErrorText>}
                </Field>
              </Row>

              <Field>
                <label htmlFor={id("titleInput")}>제목</label>
                <input id={id("titleInput")} name="title" value={values.title} maxLength={INQUIRY_LIMITS.titleMax} placeholder="한 줄로 알려 주세요" aria-invalid={!!show("title")} aria-describedby={show("title") ? id("title-e") : undefined} onChange={(e) => set("title", e.target.value)} onBlur={() => blur("title")} />
                {show("title") && <ErrorText id={id("title-e")}>{show("title")}</ErrorText>}
              </Field>

              <Field>
                <label htmlFor={id("message")}>
                  내용 <small>{values.message.length} / {INQUIRY_LIMITS.messageMax}</small>
                </label>
                <textarea id={id("message")} name="message" value={values.message} maxLength={INQUIRY_LIMITS.messageMax} placeholder="자세히 적어 주실수록 정확하게 답할 수 있어요" aria-invalid={!!show("message")} aria-describedby={show("message") ? id("message-e") : undefined} onChange={(e) => set("message", e.target.value)} onBlur={() => blur("message")} />
                {show("message") && <ErrorText id={id("message-e")}>{show("message")}</ErrorText>}
              </Field>

              {/* 스팸 봇 함정: 사람에게는 보이지 않아요 */}
              <Honeypot aria-hidden="true">
                <label>
                  웹사이트
                  <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
                </label>
              </Honeypot>

              <div>
                <Consent>
                  <input type="checkbox" name="consent" checked={values.consent} onChange={(e) => { set("consent", e.target.checked); blur("consent"); }} aria-invalid={!!show("consent")} />
                  <span>
                    <b>답변을 위해 이름과 이메일을 사용하는 것에 동의해요.</b>
                    <br />
                    보내 주신 내용은 답변과 개선에만 쓰고, 1년 뒤 삭제해요.
                  </span>
                </Consent>
                {show("consent") && <ErrorText style={{ marginTop: 8 }}>{show("consent")}</ErrorText>}
              </div>

              {status === "error" && <Banner role="alert">보내지 못했어요. 잠시 뒤 다시 시도하거나 메일로 보내 주세요.</Banner>}

              <Submit type="submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> 보내는 중…
                  </>
                ) : (
                  "보내기"
                )}
              </Submit>
            </Form>
          </>
        )}
    </Modal>
  );
}
