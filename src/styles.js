import {css} from "styled-components"

const sizes = {
    xs: 38.5,
    sm: 46,
    md: 64,
};

export const media = Object.keys(sizes).reduce((acc, label) =>
{
    acc[label] = (...args) => css`
        @media (min-width: ${sizes[label]}em){
            ${css(...args)}
        }
    `
    return acc
}, {})

export const palette = {
    footer_foreground: '#c6cfd0',
    footer_background: '#3b3e3e',

    heading_foreground: '#2c2e2e',
    
    a_foreground: '#00a2b8',
    a_hover_foreground: '#008193',
    
    mobile_bar_foreground: '#2c2e2e',
    large_bar_foreground: '#2c2e2e',
    large_bar_background: '#fff',
    search_box_underline: '#e0e8ea',
    search_box_focus_underline: '#00a2b8',
    nav_foreground: '#2c2e2e',
    nav_hover: '#008193',
    
    jumbotron_heading_foreground: '#fff',
    jumbotron_content_heading_foreground: '#fff',
    jumbotron_heading_background: 'rgba(0, 129, 147, .86)',
    jumbotron_content_heading_background: 'none',
    jumbotron_paragraph_foreground: '#2c2e2e',
    jumbotron_paragraph_background: 'rgba(251, 252, 252, .8)',
    
    zone_highlighted_background: '#eff3f4',
    zone_heading_foreground: '#2c2c2e',
    zone_content_foreground: '#000',
    zone_list_bullet_foreground: '#9aa1a2',
    
    project_phases_background: '#fbfcfc',
    project_phases_foreground: '#000',
    
    breadcrumbs_foreground: '#fff',
    
    nextprev_button_background: '#f05a22',
    nextprev_button_foreground: '#fff',
    nextprev_button_hover_foreground: '#fff',
    nextprev_button_hover_background: '#c53c0a',
    
    toc_background: '#eff3f4',
    
    scenarios_bottom_border: '#c8d1d1',
    scenarios_background: '#e6ecee',
    scenarios_plus_foreground: '#008193',
    scenarios_selected_background: '#bfcfd5',
}

export const content = {
    zone_padding_xs: '10px 20px',
    zone_padding_sm: '10px 20px',
    zone_padding_md: '16px 278px 16px 20px',
}
