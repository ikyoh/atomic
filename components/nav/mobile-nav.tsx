import { getSiteOptions } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import NavIndicator from "./navIndicator";

export async function MobileNav() {

  const options = await getSiteOptions();

  return (
    <div className="visible sm:hidden fixed z-50 bottom-0 bg-white h-[65px] border-t border-primary w-full px-4">
      <div className="relative">
        <div className="max-w-sm h-full mx-auto flex items-center justify-between overflow-clip">
          {options['navigation']?.filter(f => f.is_mobile).map((item) => (
            <Link href={item.slug} key={item.slug} className="flex flex-col items-center justify-center h-full w-full navListener">
              <Image
                src={item.icon}
                alt={item.label}
                width={50}
                height={50}
              />
            </Link>
          ))}
        </div>
        <NavIndicator options={options} variant={"mobile"} />
      </div>
    </div>
  );
}

