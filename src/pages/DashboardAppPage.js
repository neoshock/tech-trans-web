import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from '../sections/@dashboard/app';

import { fetchUserActivity } from '../_mock/user_service';

// ----------------------------------------------------------------------
import fetchAndPreparePost from '../_mock/blog';


// Función para obtener las fechas de los últimos 3 meses
const getLastThreeMonthsDates = () => {
  const dates = []; // Utilizar const
  for (let i = 0; i < 11; i += 1) { // Utilizar += 1 en lugar de ++
    const date = new Date(); // Utilizar const
    date.setDate(date.getDate() - i);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; // Utilizar const
    dates.push(formattedDate);
  }
  return dates.reverse(); // Invertir para que las fechas más antiguas aparezcan primero
};


export default function DashboardAppPage() {
  const theme = useTheme();
  const [userActivity, setUserActivity] = useState([]);
  const [activityDisplayLimit, setActivityDisplayLimit] = useState(4); // Nuevo estado para limitar las actividades mostradas
  const isUserStudent = localStorage.getItem('role') === 'student';

  const [randomChartDataA, setRandomChartDataA] = useState([]);
  const [randomChartDataB, setRandomChartDataB] = useState([]);
  const [randomChartDataC, setRandomChartDataC] = useState([]);


  const [POSTS, setPOSTS] = useState([]); // Estado para los posts

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await fetchAndPreparePost();
      setPOSTS(fetchedPosts);
    };
    fetchData();
  }
    , []);

  const chartLabels = getLastThreeMonthsDates(); // Obtener fechas de los últimos 3 meses

  useEffect(() => {
    setRandomChartDataA([...Array(11)].map(() => getRandomInt(20, 50)));
    setRandomChartDataB([...Array(11)].map(() => getRandomInt(40, 80)));
    setRandomChartDataC([...Array(11)].map(() => getRandomInt(30, 70)));
    const fetchData = async () => {
      try {
        const activityData = await fetchUserActivity(2);
        setUserActivity(activityData);
      } catch (error) {
        console.error('Ocurrió un error al obtener los datos:', error);
      }
    };



    fetchData();
  }, []);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, Bienvenido
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Mis Clases"
              subheader="(+43%) Rendimiento academico"
              chartLabels={chartLabels}
              chartData={[
                {
                  name: 'Salon A',
                  type: 'column',
                  fill: 'solid',
                  data: randomChartDataA,
                },
                {
                  name: 'Salon B',
                  type: 'area',
                  fill: 'gradient',
                  data: randomChartDataB,
                },
                {
                  name: 'Salon C',
                  type: 'line',
                  fill: 'solid',
                  data: randomChartDataC,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Mis Temas"
              chartData={[
                { label: 'Programacion', value: 4344 },
                { label: 'Estructura de datos', value: 5435 },
                { label: 'Arquitectura', value: 1443 },
                { label: 'Inteligencia de Negocios', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {
            !isUserStudent && (
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Rendimiento por estudiante"
                  subheader="(+43%) muestra resultados significativos"
                  chartData={[
                    { label: 'Manuel', value: 400 },
                    { label: 'Juan', value: 300 },
                    { label: 'Pedro', value: 200 },
                    { label: 'Maria', value: 100 },
                    { label: 'Luis', value: 90 },
                    { label: 'Josue', value: 80 },
                  ]}
                />
              </Grid>)
          }
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Temas recientes"
              list={POSTS.slice(0, 5).map((post, index) => ({
                id: index,
                title: post.title,
                autor: post.author.name,
                image: post.cover,
                time: post.createdAt,
              }))}
            />
          </Grid>
          {
            !isUserStudent && (
              <Grid item xs={12} md={6} lg={4}>
                <AppOrderTimeline
                  title="Ultimas Seciones"
                  list={userActivity.slice(0, activityDisplayLimit).map((activity, index) => ({
                    id: index,
                    title: `Login de ${activity.firstName} ${activity.lastName}`,
                    type: `order${index + 1}`,
                    time: new Date(activity.loginTime).toLocaleString(),
                  }))}
                />

              </Grid>)
          }
        </Grid>
      </Container>
    </>
  );
}
