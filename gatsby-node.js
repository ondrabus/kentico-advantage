exports.createPages = ({graphql, actions}) => {
    const { createRedirect } = actions

    createRedirect({ fromPath: '/gathering/functional-requirements', toPath: '/gathering-functional-requirements' });
    createRedirect({ fromPath: '/gathering/environment-requirements', toPath: '/gathering-environment-requirements' });
    createRedirect({ fromPath: '/developing/developing-in-a-team', toPath: '/developing-developing-in-a-team' });
    createRedirect({ fromPath: '/developing/implementing-best-practices', toPath: '/developing-implementing-best-practices' });
    createRedirect({ fromPath: '/planning/mapping-requirements', toPath: '/planning-mapping-requirements' });
    createRedirect({ fromPath: '/planning/picking-a-project-type-and-development-model', toPath: '/planning-picking-a-project-type-and-development-model' });
    createRedirect({ fromPath: '/planning/planning-content-management', toPath: '/planning-planning-content-management' });
    createRedirect({ fromPath: '/planning/identifying-data-structures', toPath: '/planning-identifying-data-structures' });
    createRedirect({ fromPath: '/project-phases', toPath: '/' });
}
