import Script from "next/script";

/**
 * 百度SEO三件套（全部按环境变量可选接入，未配置时零输出）：
 * 1. 站长验证 meta（ziyuan.baidu.com 获取）
 * 2. 百度统计 hm.js（tongji.baidu.com 获取）
 * 3. 百度自动推送 push.js（新页面被动提交收录，与 scripts/baidu-push.mjs 主动推送互补）
 */
export function BaiduSeoScripts() {
  const verification = process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || "";
  const tongjiId = process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || "";

  return (
    <>
      {verification ? (
        <meta name="baidu-site-verification" content={verification} />
      ) : null}
      {tongjiId ? (
        <Script
          id="baidu-tongji"
          strategy="afterInteractive"
          src={`https://hm.baidu.com/hm.js?${tongjiId}`}
        />
      ) : null}
      {/* 百度自动推送：仅生产环境生效，http/https 自动适配 */}
      {process.env.NODE_ENV === "production" ? (
        <Script id="baidu-autopush" strategy="afterInteractive">
          {`(function(){var bp=document.createElement('script');var curProtocol=window.location.protocol.split(':')[0];if(curProtocol==='https'){bp.src='https://zz.bdstatic.com/linksubmit/push.js';}else{bp.src='http://push.zhanzhang.baidu.com/push.js';}var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s);})();`}
        </Script>
      ) : null}
    </>
  );
}
