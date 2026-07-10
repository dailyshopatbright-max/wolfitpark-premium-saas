import type { MetadataRoute } from "next"
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",allow:"/",disallow:["/maintenance"]},sitemap:"https://wolfitpark.online/sitemap.xml",host:"https://wolfitpark.online"}}
