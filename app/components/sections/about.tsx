export default function About() {
    return (
        <section className="h-screen flex items-center justify-center" id="about">
            <div className="flex flex-col gap-6 max-w-5xl px-8">
                <h2 className="text-fuchsia-500 text-4xl font-bold text-center mb-8">
                    Crafting Digital Experiences with Passion
                </h2>

                <div className="space-y-6">
                    <p className="text-lg font-normal text-gray-300 leading-relaxed">
                        Hi, I’m Piotr Rzadkowolski, a frontend developer with 3 years of commercial experience, passionate
                        about creating engaging and efficient web solutions. My journey into coding began as a self-taught
                        enthusiast, and over time, I’ve honed my skills by learning from industry experts and immersing
                        myself in the ever-evolving world of web development. Currently, I’m mastering Next.js and Angular,
                        always striving to push the boundaries of what I can create.
                    </p>

                    <p className="text-lg font-normal text-gray-300 leading-relaxed">
                        I’m deeply committed to both personal and professional growth, dedicating my free time to exploring
                        new technologies and refining my craft. Known for my discipline, ability to work under pressure, and
                        dedication to continuous improvement, I thrive in dynamic environments. Whether working
                        independently or as part of a team, I bring responsibility, innovation, and a collaborative spirit
                        to every project.
                    </p>

                    <p className="text-lg font-normal text-gray-300 leading-relaxed">
                        Beyond coding, I’m an avid diver, cyclist, and traveler. I love meeting new people, exploring new
                        places, and drawing inspiration from the world around me. My high personal standards, attention to
                        detail, and creative approach ensure that I not only meet but exceed expectations in both my
                        professional and personal pursuits.
                    </p>
                </div>
            </div>
        </section>
    );
}