import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterLink
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit {

  ngOnInit(): void {
      this.getRevenueChart();
      this.getSalesChart();
  }

  chart:any = [];
  comparisonChart:any = [];
  salesData!: any[];
  revenue: string = '0';

  getRevenueChart() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
        console.error('Canvas element not found.');
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Canvas context not available.');
        return;
    }

    // Create gradient background for the chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#3E59E8');
    gradient.addColorStop(1, '#FFFFFF');

    // Static data
    const dates = ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4']; // Static date labels
    const ticketsSold = [5, 6, 10, 8]; // Static ticket sales data

    this.chart = new Chart('canvas', {
        type: 'line',
        data: {
            labels: dates, // Use static dates
            datasets: [
                {
                    fill: {
                        target: 'origin',
                        below: gradient, // Use the linear gradient for fading effect
                    },
                    label: 'Tickets sold',
                    data: ticketsSold, // Use static tickets sold data
                    borderWidth: 0.5,
                    borderColor: 'blue',
                    backgroundColor: gradient,
                    order: 2,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.ceil(Math.max(...ticketsSold) / 10) * 10, // Round to the nearest multiple of 10
                    grid: {
                        display: true,
                        color: '#f2f2f2', // Customize horizontal grid lines
                    },
                    ticks: {
                        stepSize: 5,
                    },
                },
                x: {
                    grid: {
                        display: false, // Hide vertical grid lines
                    },
                },
            },
            elements: {
                line: {
                    cubicInterpolationMode: 'monotone', // Smooth line curve
                },
            },
        },
    });
  }

  getSalesChart() {
    this.chart = new Chart('sales', {
        type: 'doughnut',
        data: {
            labels: ['Facebook', 'Instagram', 'Twitter'], // Static labels
            datasets: [
                {
                    label: '# of traffic',
                    data: [12, 19, 3], // Static data for traffic
                    borderWidth: 0,
                    backgroundColor: ['#b3b3ff', '#ffb3d9', '#b3b3b3'], // Static colors
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true, // Ensure y-axis starts at 0 (though unnecessary in doughnut charts)
                },
            },
        },
    });
  }

 

}
