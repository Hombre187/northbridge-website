import type { MetadataRoute } from "next"; import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["","about","rules","departments","businesses","join","gallery","staff","contact","privacy"].map(path=>({url:`${siteConfig.url}/${path}`,lastModified:new Date(),changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:.7})); }
