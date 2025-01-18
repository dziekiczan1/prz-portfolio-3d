import {HoverBorderGradient} from "@/components/ui/button";

export default function SocialMedia() {
    return (
            <div className="fixed right-10 bottom-8 flex items-center gap-14">
                <HoverBorderGradient
                    containerClassName="rotate-45 rounded"
                    as="button"
                    className="p-6 text-m font-medium"
                >
                </HoverBorderGradient>
                <HoverBorderGradient
                    containerClassName="rotate-45 rounded"
                    as="button"
                    className="p-6 text-m font-medium"
                >
                </HoverBorderGradient>
            </div>
    );
}