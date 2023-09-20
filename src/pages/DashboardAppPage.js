import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
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
import { getContentUpload, subjectByStudent, fetchActivityHistory } from '../_mock/dashboard_service';

export default function DashboardAppPage() {
  const [userActivity, setUserActivity] = useState([]);
  const [activityDisplayLimit, setActivityDisplayLimit] = useState(4); // Nuevo estado para limitar las actividades mostradas
  const isUserStudent = localStorage.getItem('role') === 'student';
  const [content, setContent] = useState([]);
  const [subjectStudent, setSubjectStudent] = useState([]);
  const [activityHistory, setActivityHistory] = useState([])
  const [POSTS, setPOSTS] = useState([]); // Estado para los posts
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await fetchAndPreparePost();
      setPOSTS(fetchedPosts);
    };
    fetchData();
  }
    , []);

  useEffect(() => {
    const fetchData = async () => {
      const contentUploadData = await getContentUpload();
      setContent(contentUploadData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const subjectStudentData = await subjectByStudent();
      setSubjectStudent(subjectStudentData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const activityHistoryData = await fetchActivityHistory();
      setActivityHistory(activityHistoryData);
      setChartLabels(activityHistoryData.map((item) => {
        // Divide la cadena de fecha en componentes (día, mes, año)
        const dateComponents = item.date.split('/').map(Number);
        // Los meses en JavaScript comienzan desde 0, así que resta 1 al mes
        const jsDate = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0]);
        return jsDate.toLocaleDateString();
      }));
    };
    fetchData();
  }, []);

  useEffect(() => {
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
              title="Historial de actividades"
              chartLabels={chartLabels}
              chartData={[
                {
                  name: 'Salon A',
                  type: 'area',
                  fill: 'gradient',
                  data:
                    activityHistory.map((item) => item.countActivityStudents)
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Mis Temas"
              chartData={
                content.map((item) => ({
                  label: item.subjectName,
                  value: item.blogCount,
                }))
              }
              chartColors={
                content.forEach((e) => {
                  return faker.internet.color();
                })
              }
            />
          </Grid>

          {
            !isUserStudent && (
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Cantidad de estudiantes por materia"
                  chartData={
                    subjectStudent.map((item) => ({
                      label: item.subjectName,
                      value: item.studentsCount,
                    }))
                  }
                />
              </Grid>)
          }
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Temas recientes"
              list={POSTS.slice(0, 5).map((post, index) => ({
                id: post.id,
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
