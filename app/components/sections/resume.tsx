import {experienceData} from "@/constants/experience";
import {Timeline} from "@/components/ui/timeline";

export default function Resume() {
    return (
        <section id="resume">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-fuchsia-500 text-4xl font-semibold text-center mb-8">
                    Career Path
                </h2>
                <p className="text-lg font-normal text-gray-300 leading-relaxed mb-8">
                    Over the past 4 years, I’ve dedicated myself to mastering frontend development, transforming ideas
                    into
                    seamless digital experiences. From self-taught beginnings to working on commercial projects, I’ve
                    honed
                    my skills in modern frameworks. Here’s a look at the milestones that have shaped my journey so far.
                </p>
            </div>
            <Timeline data={experienceData}/>
        </section>
    );
}