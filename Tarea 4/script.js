import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

const width = 500, height = 500

const projection = d3.geoMercator()
    .fitSize([width, height], data);

const path = d3.geoPath(projection);

const etiqueta = d3.select('body').append('div')
    .classed('etiqueta', true); 


const poblaciones = data.features.map(d => d.properties.Poblacion) // crea funcion a mapear
const scale = d3.scaleLinear()                                     // crea escala para mapear
    .domain([d3.min(poblaciones), d3.max(poblaciones)])            // rangos de entrada de mapeo
    .range(["#ffeaafff", "#ffae00ff"]);                        // rangos de salida de mapeo

    
d3.select('.mapa')
    .attr('transform', 'translate(0, -10)')
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('d', path)
    .attr("stroke", "#333")
    .attr("stroke-width", 1)
    .attr("fill", d => {                                           // pinta segun cantidad de habitantes
        const pob = d.properties.Poblacion
        return scale(pob)
    })

d3.select('.mapa').selectAll('path')
    .on('mouseenter', (e, d) => {
        etiqueta.style('opacity', 1)
        etiqueta.style('top', e.pageY + 10 + 'px')
        etiqueta.style('left', e.pageX + 10 + 'px')
        etiqueta.html(`<p>${d.properties.Comuna} ${d.properties.Poblacion}<p>`)
    })
    .on('mouseout', () => {
        etiqueta.style('opacity', 0)
    });
