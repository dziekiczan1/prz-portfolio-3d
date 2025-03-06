import {motion} from "framer-motion";

import {Timeline} from "@/components/ui/timeline";
import {BlurIn} from "@/components/ui/blur-in";

import {experienceData} from "@/constants/experience";
import {resumeSection} from "@/constants/sections";

export default function Resume() {
    return (
        <section id="resume" className="px-4 lg:px-0 min-h-screen mb-4 lg:mb-0">
            <div className="max-w-5xl mx-auto">
                <BlurIn className="section-heading">
                    {resumeSection.heading}
                </BlurIn>
                <motion.p initial={{opacity: 0, y: 20}}
                          whileInView={{opacity: 1, y: 0}}
                          transition={{duration: 0.6, delay: 0.4}}
                          className="section-paragraph">
                    {resumeSection.paragraph}
                </motion.p>
            </div>
            <Timeline data={experienceData}/>
        </section>
    );
}