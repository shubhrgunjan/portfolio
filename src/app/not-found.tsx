import { PillLink } from "@/components/mono/blocks";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[640px] flex-col justify-center px-6 pt-32">
      <p className="text-[13px] text-muted-foreground">404</p>
      <h1 className="mt-2 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.035em]">
        Nothing <span className="font-accent font-normal">here.</span>
      </h1>
      <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-2">
        <PillLink href="/" solid>
          Back home
        </PillLink>
        <PillLink href="/blog">Read the writing</PillLink>
      </div>
    </div>
  );
}
