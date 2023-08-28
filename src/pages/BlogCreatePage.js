import React, { useState, CSSProperties } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
// ----------------------------------------------------------------------
import RingLoader from "react-spinners/RingLoader";
import { Container, Stack, Typography, TextField, Button } from '@mui/material';

import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

const override = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

export default function BlogCreatePage() {
  const apiKey = process.env.REACT_APP_API_KEY_OPEN_IA;
  const apiUrl = process.env.REACT_APP_URL_API_OPEN_IA;

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Cambiado a false porque al principio no estamos cargando
  const [color, setColor] = useState("#3336FF");
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    content: '',
  });



  const extractHTML = (content) => {
    const match = content.match(/```html\n([\s\S]*?)\n```/);
    return match ? match[1] : content;
  };

  const handleSearch = async () => {
    setLoading(true);

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
              content: 'Eres un asistente que genera contenido sobre un tema específico compatible con WYSIWYG para generar un diseño.',
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
      const pureHTML = extractHTML(generatedContent);
      const sanitizedContent = DOMPurify.sanitize(pureHTML);

      setFormData((prevData) => ({
        ...prevData,
        content: sanitizedContent,
      }));

      // Finalizamos la carga
      setLoading(false);

    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      setLoading(false); // Asegurarnos de finalizar la carga incluso si hay un error
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
      <div style={{
        display 
        : loading ? 'flex' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
      }} className='loadingContainer'>
        <RingLoader color={color} css={override} loading={loading} size={150} />
      </div>
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
              <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }} component={Link}>
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
