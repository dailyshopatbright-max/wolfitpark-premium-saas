import { WolfMark } from "@/components/logo"
export default function Loading(){return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background" role="status"><div className="text-center"><WolfMark className="mx-auto size-12 animate-pulse text-primary"/><p className="mt-4 text-sm font-medium text-muted-foreground">Loading Wolfitpark</p></div></div>}
