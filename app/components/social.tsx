import {HoverBorderGradient} from "@/components/ui/button";
import {socialMediaData} from "@/constants/social";
import Image from "next/image";
import Link from "next/link";

export default function SocialMedia() {
    return (
        <div className="fixed left-4 right-4 md:left-auto md:right-10 bottom-4 md:bottom-8 flex justify-between md:justify-start items-center md:gap-14 z-10">
            {socialMediaData.map((social) => (
                <Link href={social.link} target="_blank" rel="noreferrer" key={social.name}>
                    <HoverBorderGradient
                        containerClassName="md:rotate-45 rounded"
                        as="button"
                        className="p-4 text-m font-medium group"
                    >
                        <Image
                            src={social.logo}
                            alt={social.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 md:-rotate-45 transition-transform duration-300 group-hover:scale-110"
                        />
                    </HoverBorderGradient>
                </Link>
            ))}
        </div>
    );
}