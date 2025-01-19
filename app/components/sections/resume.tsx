import {experienceData} from "@/constants/experience";
import {Timeline} from "@/components/ui/timeline";

export default function Resume() {
    return (
        <section>
            <Timeline data={experienceData}/>
        </section>
    );
}