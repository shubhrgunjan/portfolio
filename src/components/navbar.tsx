import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import type { ReactNode } from "react";

const ICON =
  "rounded-full cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-brand hover:bg-brand-soft border border-border transition-colors";

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className="rounded-lg bg-foreground px-3 py-1.5 text-xs text-background">
        <p>{label}</p>
        <TooltipArrow className="fill-foreground" />
      </TooltipContent>
    </Tooltip>
  );
}

/** Floating Magic UI dock: pages, then socials, then the theme switch. */
export default function Navbar() {
  const socials = Object.entries(DATA.contact.social).filter(([, s]) => s.navbar);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="pointer-events-auto relative mx-auto flex h-14 w-fit gap-1.5 border bg-card/85 p-2 shadow-[0_8px_30px_-8px] shadow-brand/25 backdrop-blur-2xl sm:gap-2">
        {DATA.navbar.map((item) => (
          <Item key={item.href} label={item.label}>
            <a href={item.href} aria-label={item.label}>
              <DockIcon className={ICON}>
                <item.icon className="size-full" />
              </DockIcon>
            </a>
          </Item>
        ))}
        {/* on phones the socials live in the footer, so the dock fits a narrow screen */}
        <Separator orientation="vertical" className="m-auto hidden h-2/3 w-px bg-border sm:block" />
        {socials.map(([name, social]) => {
          const external = social.url.startsWith("http");
          return (
            <Item key={name} label={social.name}>
              <a
                href={social.url}
                className="hidden sm:block"
                aria-label={social.name}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <DockIcon className={ICON}>
                  <social.icon className="size-full" />
                </DockIcon>
              </a>
            </Item>
          );
        })}
        <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />
        <Item label="Theme">
          <DockIcon className={ICON}>
            <ModeToggle className="size-full cursor-pointer" />
          </DockIcon>
        </Item>
      </Dock>
    </div>
  );
}
