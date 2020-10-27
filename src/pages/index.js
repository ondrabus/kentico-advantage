import React from "react"
import Jumbotron from "../components/jumbotron"
import Teaser from "../components/teaser"
import Layout from "../components/layout"
import ProjectPhases from "../components/project-phases"

export default () => (
    <Layout>
        <main>
            <Jumbotron
                className="jumbotron-homepage"
                header="Kentico Advantage"
                teaser="Leverage the collective experience of Kentico solution architects to successfully navigate the process of building a Kentico project using best practices and avoiding pitfalls through every stage of your project."
            />
            
            <Teaser>
                <h2>Project phases</h2>
                <p>We identified six primary phases for Kentico projects. If you follow a waterfall like development approach you'll apply each section in a linear fashion over the course of the project. Alternatively, if you follow an agile approach, you'll do this as of each sprint.</p>
                <p>Regardless of the approach you take, each phase covers the key concepts and best practices you need to know, presents real-world scenarios to help with application, and provides additional resources related to the section.</p>
            </Teaser>
             
            <ProjectPhases />
        </main>
    </Layout>
)