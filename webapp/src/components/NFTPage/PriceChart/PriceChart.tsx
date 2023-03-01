import React from 'react'
import { Props } from './PriceChart.types'
import './PriceChart.css'
import { Line } from 'react-chartjs-2'

const PriceChart = (props: Props) => {
  const { values, labels } = props

  const data = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx?.createLinearGradient(0, 0, 0, 210)
    gradient?.addColorStop(0, 'rgba(242,49,175,0.4)')
    gradient?.addColorStop(1, 'rgba(242,49,175,0)')

    return {
      labels: labels,
      datasets: [
        {
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(0, 0, 0, 0)',
          pointHoverBackgroundColor: '#F231AF',
          pointHoverBorderColor: '#FFFFFF',
          lineTension: 0.4,
          fill: 'start',
          backgroundColor: gradient,
          borderColor: '#F231AF',
          borderWidth: 2,
          pointColor: '#fff',
          data: values
        }
      ]
    }
  }

  const options = {
    elements: {
      point: {
        pointStyle: 'circle',
        hoverRadius: 8,
        borderWidth: 2,
        hoverBorderWidth: 2
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        external: (context: any) => {
          let tooltipEl = document.getElementById('chartjs-tooltip')
          let lineEl = document.getElementById('chartjs-line')
          if (!lineEl) {
            lineEl = document.createElement('div')
            lineEl.id = 'chartjs-line'
            lineEl.innerHTML = '<table></table>'
            document.body.appendChild(lineEl)
          }
          if (!tooltipEl) {
            tooltipEl = document.createElement('div')
            tooltipEl.id = 'chartjs-tooltip'
            tooltipEl.innerHTML = '<table></table>'
            document.body.appendChild(tooltipEl)
          }

          let tooltipModel = context.tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0'
            lineEl.style.opacity = '0'
            return
          }

          tooltipEl.classList.remove('above', 'below', 'no-transform')
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
          } else {
            tooltipEl.classList.add('no-transform')
          }

          function getBody(bodyItem: any) {
            return bodyItem.lines
          }

          if (tooltipModel.body) {
            const bodyLines = tooltipModel.body.map(getBody)

            let innerHtml = '<thead>'

            bodyLines.forEach(function(title: string[]) {
              innerHtml +=
                '<tr><th>' + title[0].replace(',', '') + ' KMON</th></tr>'
            })
            innerHtml += '</thead>'

            const tableRoot = tooltipEl.querySelector('table')
            if (tableRoot) {
              tableRoot.innerHTML = innerHtml
            }
          }

          const position = context.chart.canvas.getBoundingClientRect()

          tooltipEl.style.opacity = '1'

          tooltipEl.style.left =
            position.left +
            window.pageXOffset +
            (tooltipModel.caretX - 54) +
            'px'
          tooltipEl.style.top =
            position.top +
            window.pageYOffset +
            (tooltipModel.caretY - 44) +
            'px'

          lineEl.style.opacity = '1'

          lineEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + 'px'
          lineEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + 'px'
          lineEl.style.height = 211 - tooltipModel.caretY + 'px'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          color: '#676370',
          align: 'center',
          font: {
            size: 12,
            family: 'PT-Mono'
          }
        },
        legend: {
          display: false
        }
      },
      y: {
        grid: {
          drawBorder: false,
          borderDash: [4],
          color: '#46444C'
        },
        ticks: {
          autoSkip: true,
          beginAtZero: true,
          precision: 0,
          stepSize: 1000,
          color: '#676370',
          font: {
            size: 10,
            family: 'PT-Mono'
          },
          callback: (value: number) => {
            return `${value}`.replace(',', '')
          }
        }
      }
    }
  }
  return (
    <div className="dna-container">
      <Line width={678} height={240} data={data} options={options} />
    </div>
  )
}
export default React.memo(PriceChart)
