"use client";

import { Box, Lock, Search, Settings, Sparkles, Image as ImageIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-6 lg:gap-4 xl:max-h-[42rem] xl:grid-rows-4">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
      />

      <GridItem
        area="md:[grid-area:1/7/3/13] xl:[grid-area:1/5/3/9]"
        icon={<ImageIcon className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Featured content"
        description="Our most impressive visual showcase"
        image="/public/M-Hash-Logo.png"
        imageSize="large"
      />

      <GridItem
        area="md:[grid-area:2/1/4/7] xl:[grid-area:2/1/4/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="The best AI code editor ever."
        description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
      />

      <GridItem
        area="md:[grid-area:3/7/5/13] xl:[grid-area:1/9/3/13]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend"
        image="/public/logo.png"
        imageSize="medium"
      />

      <GridItem
        area="md:[grid-area:4/1/6/7] xl:[grid-area:3/5/4/9]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
      />

      <GridItem
        area="md:[grid-area:5/7/7/13] xl:[grid-area:3/9/4/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
        image="/public/logo_iic.png"
        imageSize="small"
      />

      <GridItem
        area="md:[grid-area:6/1/7/13] xl:[grid-area:4/1/5/13]"
        icon={<ImageIcon className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Showcase Gallery"
        description="A full-width gallery to display your most impressive work"
        image="/public/about-us.png"
        imageSize="fullwidth"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  image?: string;
  imageSize?: 'small' | 'medium' | 'large' | 'fullwidth';
}

const GridItem = ({ area, icon, title, description, image, imageSize }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>

            {image && (
              <div className={`mt-4 overflow-hidden rounded-lg ${
                imageSize === 'small' ? 'h-32' : 
                imageSize === 'medium' ? 'h-48' : 
                imageSize === 'large' ? 'h-64' : 
                'h-56 w-full'
              }`}>
                <Image
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                  width={imageSize === 'fullwidth' ? 1200 : 600}
                  height={imageSize === 'fullwidth' ? 400 : imageSize === 'large' ? 300 : imageSize === 'medium' ? 200 : 150}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
