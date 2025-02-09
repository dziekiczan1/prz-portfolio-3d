import Image from "next/image";
import {motion} from "framer-motion";

import {FormStatus} from "@/types/form";

export const StatusIndicator = ({ status }: { status: FormStatus }) => {
    const statusConfig = {
        loading: { icon: "spinner.svg", text: "Sending...", color: "text-gray-300" },
        success: { icon: "check.svg", text: "Message Sent!", color: "text-green-500" },
        error: { icon: "times.svg", text: "Failed to Send. Try Again.", color: "text-red-500" },
    } as const;

    if (status === "idle") return null;

    const currentStatus = statusConfig[status];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2"
        >
            <Image
                src={`./icons/${currentStatus.icon}`}
                alt={status}
                width={22}
                height={22}
                className={status === "loading" ? "animate-spin" : ""}
            />
            <p className={`${currentStatus.color} text-xs`}>{currentStatus.text}</p>
        </motion.div>
    );
};