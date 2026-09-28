import { permanentRedirect } from "next/navigation";

// /training 已永久合并到 /methodology#training（308，保留旧外链与浏览器历史权重）。
// 站内内链已全部直指 /methodology#training，sitemap 不再收录本地址。
export default function TrainingPage() {
  permanentRedirect("/methodology");
}
