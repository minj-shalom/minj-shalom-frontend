type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * @description JSON-LD 구조화 데이터를 <script>로 렌더링합니다.
 * `<`를 유니코드로 치환해 XSS 주입을 막습니다.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
