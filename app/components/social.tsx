import {HoverBorderGradient} from "@/components/ui/button";
import {socialMediaData} from "@/constants/social";
import Link from "next/link";

export default function SocialMedia() {
    return (
        <div className="fixed right-10 bottom-8 flex items-center gap-14 z-10">
            {socialMediaData.map((social) => (
                <Link href={social.link} target="_blank" rel="noreferrer" key={social.name}>
                    <HoverBorderGradient
                        containerClassName="rotate-45 rounded"
                        as="button"
                        className="p-4 text-m font-medium"
                    >

                        <img
                            src={social.logo}
                            alt={social.name}
                            className="w-6 h-6 -rotate-45"
                        />
                    </HoverBorderGradient></Link>
            ))}
        </div>
    );
}