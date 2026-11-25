import Image from "next/image";
import webShot from "@/assets/projects/housenow-web.webp";
import appShot from "@/assets/projects/housenow-app.webp";

/** Real screenshots of HouseNow's public web and client app, framed. Agent details are blurred. */
export function HouseNowShowcase({ caption, webAlt, appAlt }: { caption: string; webAlt: string; appAlt: string }) {
  return (
    <figure>
      <div className="relative pb-10 pr-[18%] sm:pb-14">
        {/* Browser */}
        <div className="overflow-hidden border border-ink bg-raised">
          <div className="flex items-center gap-3 border-b border-ink bg-ink px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 bg-surface/80" />
              <span className="h-2 w-2 bg-surface/50" />
              <span className="h-2 w-2 bg-surface/30" />
            </span>
            <span className="flex-1 truncate bg-[#2a2d2a] px-2.5 py-1 font-mono text-[11px] leading-4 text-on-panel-muted">housenow.com.vn/can-ho-chung-cu</span>
          </div>
          <Image src={webShot} alt={webAlt} loading="eager" sizes="(min-width: 1024px) 50vw, 90vw" className="block h-auto w-full" placeholder="blur" />
        </div>

        {/* Phone */}
        <div className="absolute bottom-0 right-0 w-[30%] min-w-[118px] border-[5px] border-ink bg-ink shadow-[8px_8px_0_0_var(--lime)]">
          <Image src={appShot} alt={appAlt} loading="eager" sizes="(min-width: 1024px) 18vw, 32vw" className="block h-auto w-full" placeholder="blur" />
        </div>
      </div>
      <figcaption className="label mt-3 border-t border-line pt-2 text-muted">{caption}</figcaption>
    </figure>
  );
}
