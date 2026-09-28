import Script from "next/script";

/**
 * 百度SEO脚本：
 * 1. 站长验证 meta（layout.tsx metadata.other，codeva-14uL2L1zsa）
 * 2. 百度统计 hm.js（afterInteractive 延迟加载，不阻塞首屏；ID 与 NEXT_PUBLIC_BAIDU_TONGJI_ID 一致）
 * 3. 百度自动推送 push.js（新页面被动提交收录，与 scripts/baidu-push.mjs 主动推送互补）
 */
const TONGJI_ID =
  process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || "ccc65e8c67181fa1170784a1c40da717";

export function BaiduSeoScripts() {
  return (
    <>
      {/* 百度统计：延迟到交互后加载，避免阻塞首屏渲染 */}
      <Script
        id="baidu-tongji"
        strategy="afterInteractive"
        src={`https://hm.baidu.com/hm.js?${TONGJI_ID}`}
      />
      {/* 百度自动推送：仅生产环境生效，http/https 自动适配 */}
      {process.env.NODE_ENV === "production" ? (
        <Script id="baidu-autopush" strategy="afterInteractive">
          {`(function(){var bp=document.createElement('script');var curProtocol=window.location.protocol.split(':')[0];if(curProtocol==='https'){bp.src='https://zz.bdstatic.com/linksubmit/push.js';}else{bp.src='http://push.zhanzhang.baidu.com/push.js';}var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s);})();`}
        </Script>
      ) : null}
    </>
  );
}
