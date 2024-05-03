import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const StatisticsTitle = styled.h1`
  color: #FF6767;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ChartWrapper = styled.div`
  flex: 1;
`;

const DivStatistics = styled.div`
  margin-left: 70px;
`;

const StatisticItem = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #FF4010;
`;

const Statistics = () => {
  const [projects, setProjects] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(savedProjects);
  }, []);

  const calculateStatistics = () => {
    const totalProjects = projects.length;
    const todoProjects = projects.filter(project => project.status === 'To Do').length;
    const doingProjects = projects.filter(project => project.status === 'Doing').length;
    const doneProjects = projects.filter(project => project.status === 'Done').length;

    return {
      totalProjects,
      todoProjects,
      doingProjects,
      doneProjects,
    };
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart');
    const { todoProjects, doingProjects, doneProjects } = calculateStatistics();

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['To Do', 'Doing', 'Done'],
        datasets: [{
          label: 'Projects',
          data: [todoProjects, doingProjects, doneProjects],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', 
            'rgba(54, 162, 235, 0.6)', 
            'rgba(75, 192, 192, 0.6)', 
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        animation: {
          animateScale: true,
          animateRotate: true
        },
        plugins: {
          title: {
            display: true,
            text: 'Project Status',
            padding: {
              top: 10,
              bottom: 30
            },
            font: {
              size: 20
            }
          },
          legend: {
            position: 'right',
            labels: {
              boxWidth: 20,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                var label = context.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed + '%';
                return label;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [projects]); 

  const { totalProjects, todoProjects, doingProjects, doneProjects } = calculateStatistics();

  return (
    <div>
      <StatisticsTitle>Statistics</StatisticsTitle>
      <ChartContainer>
        <ChartWrapper>
          <canvas id="myChart" width="350" height="350"></canvas>
        </ChartWrapper>
        <DivStatistics>
          <StatisticItem>Total Projects: {totalProjects}</StatisticItem>
          <StatisticItem>Projects To Do: {todoProjects}</StatisticItem>
          <StatisticItem>Projects Doing: {doingProjects}</StatisticItem>
          <StatisticItem>Projects Done: {doneProjects}</StatisticItem>
        </DivStatistics>
      </ChartContainer>
    </div>
  );
}

export default Statistics;
