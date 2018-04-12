import ChartWrapper from '../../global/ChartWrapper';
import * as d3 from 'd3';

class BarChart extends ChartWrapper {
    width: number;
    height: number;
    initialized: boolean;
    svg;
    rect;
    xAxis;
    yAxis;
    xScale;
    yScale;
    calculateX;
    calculateY;
    xScaleGen;
    yScaleGen;

    options: {
        standalone: boolean,
        chartContainer: string
        data: {},
        xKey: string,
        yKey: string,
        paddingTickX: number,
        svg,
        margin,
        transitionDuration: number,
        transitionDelay: number,
    };
    constructor(options) {
        let defaultOptions = {
            chartContainer: '[data-js-item="chart"]',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            xKey: null, // todo: what if this is an array? => select dropdown => update on change etc
            yKey: null, // todo: what if this is an array? => select dropdown => update on change etc
            paddingTickX: 0.05,
            margin: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            },
            standalone: true,
            isStacked: false, // todo: what about Stacked Bar Charts ???
            grid: false, // todo: add default grid or not ???
            svg: {
                contextClass: 'svg__bar-chart',
                height: 550,
                backgroundColor: '#f7f7f7'
            }
        };

        super(defaultOptions, options);
    }

    getXScale(data) {
        return d3
            .scaleBand()
            .domain(data)
            .rangeRound([0, (this.width || this.getDefaultWidth())])
            .padding(this.options.paddingTickX);
    }

    getYScale(data) {
        return d3
            .scaleLinear()
            .domain([0, parseInt(d3.max(data))])
            .range([this.height, 0]);
    }

    getXAxis() {
        return d3
            .axisBottom(this.xScale)
            .scale(this.xScale);
    }

    getYAxis() {
        return d3
            .axisLeft(this.yScale)
            .scale(this.yScale);
    }

    displayChart() { // this should only be run once to 'initialize', otherwise error gets thrown
        if (this.initialized) {
            throw new Error("This component has already been initialized. Make sure you set standalone in this.options to false or check the documentation if you would like to run this module at runtime.");
        }

        this.initialized = true;

        this.height = this.options.svg.height - this.options.margin.top - this.options.margin.bottom;
        this.width = (this.options.svg.width || this.getDefaultWidth()) - this.options.margin.left - this.options.margin.right;
        this.svg = d3
            .select(this.chartContainer)
            .append('svg')
            .classed(this.options.svg.contextClass, true)
            .attr('width', this.width + this.options.margin.left + this.options.margin.right)
            .attr('height', this.height + this.options.margin.top + this.options.margin.bottom)
            .style('background-color', this.options.svg.backgroundColor)
            .append('g')
            .attr('transform', 'translate(' + this.options.margin.left + ',' + this.options.margin.top + ')');

        this.renderData();
    }

    renderData() {
        this.xScaleGen = () => this.getXScale(this.xData? this.xData: this.data);
        this.yScaleGen = () => this.getYScale(this.yData? this.yData: this.data);

        this.xScale = this.xScaleGen();
        this.yScale = this.yScaleGen();

        this.calculateX = (d) => {
            d = this.xKey? d[this.xKey]: d;
            return this.xScale(d);
        };

        this.calculateY = (d) => {
            d = this.yKey? d[this.yKey]: d;
            return this.yScale(d);
        };

        if (!this.yAxis) {
            this.yAxis = this.svg
                .append('g')
                .classed('yaxis', true);
        }

        this.yAxis
            .transition()
            .duration(this.options.transitionDuration? this.options.transitionDuration : 0)
            .call(this.getYAxis());

        if (!this.xAxis) {
            this.xAxis = this.svg
                .append('g')
                .style('transform', `translateY(${ this.height }px)`)
                .classed('xaxis', true);
        }

        this.xAxis
            .transition()
            .duration(this.options.transitionDuration? this.options.transitionDuration : 0)
            .call(this.getXAxis());

        this.rect = this.svg
            .selectAll('rect')
            .data(this.data);

        this.rect
            .enter()
            .append('rect')
            .classed('bar', true);

        this.svg
            .selectAll('rect.bar')
            .attr('x', (d) => {
                return this.calculateX(d);
            })
            .attr('y', () => {
                return this.height;
            })
            .attr('width', () => {
                return this.getXScale(this.xData? this.xData: this.data).bandwidth();
            })
            .style('transform', () => {
                const translateY = this.yScale(0) + this.height;
                return 'rotateX(180deg)' + ' translateY(-' + translateY + 'px)';
            })
            .transition()
            .delay(this.options.transitionDelay? this.options.transitionDelay : 0)
            .duration(this.options.transitionDuration? this.options.transitionDuration : 0)
            .attr('height', d => {
                return Math.abs(this.calculateY(d) - this.yScale(0));
            });
    }
}

export default BarChart;