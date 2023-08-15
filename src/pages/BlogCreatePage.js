import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
// ----------------------------------------------------------------------
import { Container, Stack, Typography, TextField, Button } from '@mui/material';

import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

export default function BlogCreatePage() {
  const apiKey = process.env.REACT_APP_API_KEY_OPEN_IA;
  const apiUrl = process.env.REACT_APP_URL_API_OPEN_IA;

  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    content: '',
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'Eres un asistente que genera contenido sobre un tema específico compatible con WYSIWYG para generar un diseño.',
            },
            {
              role: 'system',
              content: 'Eres un asistente que solo responde el resultado de lo que se te pide.',
            },
            {
              role: 'user',
              content: `Genera contenido HTML compatible con WYSIWYG, relacionado con el tema "${searchTerm}" para su publicación en un blog.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      const sanitizedContent = DOMPurify.sanitize(generatedContent); 

      setFormData((prevData) => ({
        ...prevData,
        content: sanitizedContent,
      }));

      // Manejar la respuesta de la API aquí
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario (formData)
    console.log('Datos del formulario:', formData);
  };

  const handleChange = (value) => {
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Create </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Crear Nueva Publicación
          </Typography>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleSubmit}
            component={Link}
          >
            Crear
          </Button>
        </Stack>
        <form className="grid grid-cols-12 gap-6 " onSubmit={handleSubmit}>
          <div className="col-span-6">
            <TextField
              fullWidth
              label="Título"
              name="title"
              variant="outlined"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-4">
            <TextField
              fullWidth
              label="Autor"
              name="author"
              variant="outlined"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <TextField
              fullWidth
              label="Fecha"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-12 flex flex-col gap-3">
            <p className="text-lg font-medium">Generación del Contenido</p>

            <div className="flex flex-row">
              <TextField
                fullWidth
                label="Generar con IA"
                name="title"
                placeholder="Ingrese el tema a buscar"
                variant="filled"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}           component={Link}> 
                Buscar
              </Button>
            </div>

            <ReactQuill value={formData.content} onChange={handleChange} />
          </div>
        </form>
      </Container>
    </>
  );
}
