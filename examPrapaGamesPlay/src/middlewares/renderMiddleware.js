import { render } from "../../node_modules/lit-html/lit-html.js";

const siteElement = document.getElementById('main-content');

export function renderMiddleware(ctx, next) {
    ctx.render = (resultTemplate) => {
        render(resultTemplate, siteElement)
    };

    next()
}