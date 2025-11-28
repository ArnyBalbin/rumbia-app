import { ArrowRight, ArrowLeft, Download, SkipForward, Sparkles, CheckCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import '../styles/scroll.css'
import jsPDF from 'jspdf'

// 🧩 Importa tus componentes comunes
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'

const StepsForVocation = () => {
  const [selectedTest, setSelectedTest] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  // Test de Habilidades Sociales (Motivación para seguir estudios)
  const socialSkillsTest = {
    name: "Habilidades Sociales",
    description: "Evalúa tu motivación intrínseca y extrínseca para seguir estudios superiores",
    areas: [
      { key: "expectativas", name: "Expectativas", questions: [1, 2, 3, 4, 5, 6] },
      { key: "padres", name: "Padres", questions: [7, 8, 9, 10, 11, 12] },
      { key: "costos", name: "Costos", questions: [13, 14, 15, 16, 17, 18] },
      { key: "capacidades", name: "Capacidades", questions: [19, 20, 21, 22, 23, 24] },
      { key: "duracion", name: "Duración de Estudios", questions: [25, 26, 27, 28, 29, 30] },
      { key: "prestigio", name: "Prestigio", questions: [31, 32, 33, 34, 35, 36] },
      { key: "distancia", name: "Distancia", questions: [37, 38, 39, 40, 41, 42] },
      { key: "futuro", name: "Futuro Profesional", questions: [43, 44, 45, 46, 47, 48] }
    ],
    questions: [
      { id: 1, text: "TENGO PLANEADO QUE HACER CON MI FUTURO", correctAnswer: "SI" },
      { id: 2, text: "DESEO SEGUIR ESTUDIOS SUPERIORES, AL FINALIZAR EL COLEGIO.", correctAnswer: "SI" },
      { id: 3, text: "PIENSO TRABAJAR Y ESTUDIAR AL MISMO TIEMPO, UNA VEZ CULMINADOS MIS ESTUDIOS SECUNDARIOS.", correctAnswer: "SI" },
      { id: 4, text: "CONSIDERO NECESARIO TRABAJAR Y ESTUDIAR A LA VEZ", correctAnswer: "SI" },
      { id: 5, text: "PREFIERO TOMARME UN TIEMPO DE DESCANSO ANTES DE ESTUDIAR O TRABAJAR.", correctAnswer: "NO" },
      { id: 6, text: "DESEO SEGUIR ESTUDIOS SUPERIORES PARA PODER SOBRESALIR EN MI DISTRITO.", correctAnswer: "SI" },
      { id: 7, text: "SIENTO QUE MIS PADRES ME ANIMAN A SEGUIR UNA CARRERA PROFESIONAL.", correctAnswer: "SI" },
      { id: 8, text: "FRECUENTEMENTE MIS PADRES DIALOGAN CONMIGO SOBRE LAS DIVERSAS CARRERAS PROFESIONALES POR LAS QUE PUEDO OPTAR.", correctAnswer: "SI" },
      { id: 9, text: "PIENSO QUE MIS PADRES ME IMPONEN QUE HACER CON MI FUTURO.", correctAnswer: "NO" },
      { id: 10, text: "CREO QUE MIS PADRES SE MUESTRAN ENTUSIASTAS CON MI ELECCION PROFESIONAL.", correctAnswer: "SI" },
      { id: 11, text: "SUELO PENSAR QUE MIS PADRES PREFERIRIAN QUE TRABAJE ANTES QUE ESTUDIE.", correctAnswer: "NO" },
      { id: 12, text: "MIS PADRES DESEAN QUE CONTINUE EN EL NEGOCIO FAMILIAR ANTES QUE ESTUDIAR.", correctAnswer: "NO" },
      { id: 13, text: "CREO QUE ACCEDER A UNA CARRERA PROFESIONAL ES DEMASIADO COSTOSO PARA MÍ.", correctAnswer: "NO" },
      { id: 14, text: "PIENSO QUE MIS PADRES, SI ESTAN EN POSIBILIDADES DE PAGAR MIS ESTUDIOS SUPERIORES.", correctAnswer: "SI" },
      { id: 15, text: "PREFIERO TRABAJAR Y AHORRAR PARA POSTERIORMENTE COSTEARME MIS ESTUDIOS.", correctAnswer: "NO" },
      { id: 16, text: "PREFIERO ESTUDIAR EN UN INSTITUTO QUE EN UNA UNIVERSIDAD POR SER MENOS COSTOSA.", correctAnswer: "NO" },
      { id: 17, text: "PREFIERO ESTUDIAR UN CARRERA CORTA Y BARATA QUE ME PERMITA GANAR DINERO RAPIDAMENTE.", correctAnswer: "NO" },
      { id: 18, text: "CREO QUE DEBO ESTUDIAR EN UNA UNIVERSIDAD NACIONAL POR QUE MIS RECURSOS NO ME PERMITEN ACCEDER A UNA PARTICULAR.", correctAnswer: "SI" },
      { id: 19, text: "ME SIENTO EN CAPACIDAD PARA ESTUDIAR UNA CARRERA PROFESIONAL.", correctAnswer: "SI" },
      { id: 20, text: "CREO QUE MIS CAPACIDADES ECONOMICAS ME PERMITEN SOLO TRABAJAR.", correctAnswer: "NO" },
      { id: 21, text: "NO ME SIENTO CON ÁNIMOS DE SEGUIR ESTUDIOS SUPERIORES EN ESTE MOMENTO.", correctAnswer: "NO" },
      { id: 22, text: "PREFIRIRIA SEGUIR ESTUDIOS SUPERIORES.", correctAnswer: "SI" },
      { id: 23, text: "CONSIDERO QUE EL EXAMEN DE ADMISION ES MUY DIFICIL PARA MI.", correctAnswer: "NO" },
      { id: 24, text: "PREFIERO TRABAJAR ANTES QUE FRACASAR EN UN EXAMEN DE ADMISION.", correctAnswer: "NO" },
      { id: 25, text: "ESTIMO QUE EL TIEMPO DE ESTUDIOS ES SUFICIENTE PARA FORMARME COMO PROFESIONAL.", correctAnswer: "SI" },
      { id: 26, text: "PREFIERO ESCOGER UNA CARRERA DE CORTO TIEMPO PARA TRABAJAR LO ANTES POSIBLE.", correctAnswer: "NO" },
      { id: 27, text: "PREFIERO TRABAJAR POR QUE EL TIEMPO DE ESTUDIOS ES MUY EXTENSO.", correctAnswer: "NO" },
      { id: 28, text: "PREFIRIRIA ESTUDIAR EN UNA UNIVERSIDAD PARTICULAR PARA EVITAR LAS HUELGAS DE LA UNIVERSIDAD NACIONAL Y ASI TERMINAR MAS RAPIDO MI CARRERA.", correctAnswer: "SI" },
      { id: 29, text: "PIENSO QUE EL TIEMPO INVERTIDO EN MIS ESTUDIOS VALE LA PENA A FUTURO.", correctAnswer: "SI" },
      { id: 30, text: "NO DESEO ESTUDIAR POR QUE ES UNA PERDIDA DE TIEMPO, PREFIERO TRABAJAR EN EL NEGOCIO DE MIS PADRES.", correctAnswer: "NO" },
      { id: 31, text: "PREFIERO TRABAJAR POR QUE LOS CENTROS DE ESTUDIOS SUPERIORES HAN PERDIDO REPUTACION.", correctAnswer: "NO" },
      { id: 32, text: "SI ESCOJO ESTUDIAR EN UNA UNIVERSIDAD TENDRE MAS PRESTIGIO QUE ESTUDIAR EN UN INSTITUTO", correctAnswer: "NO" },
      { id: 33, text: "SI ESCOJO ESTUDIAR EN UNA UNIVERSIDAD NACIONAL TENDRE MAS PRESTIGIO QUE ESTUDIAR EN UNA UNIVERSIDAD PARTICULAR.", correctAnswer: "NO" },
      { id: 34, text: "SI TRABAJO TENDRE MAYOR RECONOCIMIENTO QUE SI ESTUDIO.", correctAnswer: "NO" },
      { id: 35, text: "EL PRESTIGIO LO OBTENGO CON MI ESFUERZO Y NO CON UN TITULO PROFESIONAL.", correctAnswer: "NO" },
      { id: 36, text: "SI ESCOJO CONTINUAR ESTUDIOS SUPERIORES TENDRE MAS PRESTIGIO QUE LA PERSONA QUE SOLO TRABAJAN.", correctAnswer: "NO" },
      { id: 37, text: "LA DISTANCIA DE MI HOGAR HACIA EL CENTRO DE ESTUDIOS SUPERIORES ES UN IMPEDIMENTO PARA QUE ESTUDIE.", correctAnswer: "NO" },
      { id: 38, text: "ME GUSTARIA ESTUDIAR EN LA CAPITAL PERO DEBO CONFORMARME CON ESTUDIAR EN TRUJILLO DEBIDO A QUE ESTA MAS CERCA Y ES MÁS ECONÓMICO.", correctAnswer: "NO" },
      { id: 39, text: "PREFIERO TRABAJAR DEBIDO A QUE LAS UNIVERSIDADES ESTAN MUY LEJOS DE MI DISTRITO.", correctAnswer: "NO" },
      { id: 40, text: "SIENTO QUE ESTARIA DISPUESTO A MOVILIZARME DIARIAMENTE A MI CENTRO DE ESTUDIOS.", correctAnswer: "SI" },
      { id: 41, text: "PREFIERO ESTUDIAR LEJOS PARA QUE MIS PADRES NO ME CONTROLEN.", correctAnswer: "NO" },
      { id: 42, text: "PREFIERO IR A TRABAJAR EN UN PAIS DEL EXTRANJERO PARA PODER AYUDAR A MI FAMILIA ECONOMICAMENTE.", correctAnswer: "SI" },
      { id: 43, text: "CREO QUE LA MAYORIA DE EGRESADOS, NO CONSIGUE TRABAJO FIJO.", correctAnswer: "SI" },
      { id: 44, text: "AL TERMINAR MI CARRERA PROFESIONAL CONSEGUIRE TRABAJO RAPIDAMENTE.", correctAnswer: "SI" },
      { id: 45, text: "PIENSO QUE LA MAYORIA DE EGRESADOS, TRABAJAN EN UN SECTOR DIFERENTE AL SUYO.", correctAnswer: "NO" },
      { id: 46, text: "CUANDO TERMINE DE ESTUDIAR MI CARRERA, ME GUSTARIA TRABAJAR EN EL EXTRANJERO PUES PAGAN MEJOR QUE EN MI PAIS.", correctAnswer: "SI" },
      { id: 47, text: "AL TERMINAR MI CARRERA PROFESIONAL, TENGO MAS POSIBILIDADES DE ENCONTRAR UN PUESTO BIEN REMUNERADO.", correctAnswer: "SI" },
      { id: 48, text: "PREFIERO ACEPTAR UN TRABAJO AL TERMINAR MI CARRERA QUE ME PAGEN POCO PERO ESTABLE, A UNO QUE GANE BIEN PERO INESTABLE.", correctAnswer: "SI" }
    ]
  }
  // Test de Inteligencias Múltiples
  const multipleIntelligencesTest = {
    name: "Inteligencias Múltiples",
    description: "Descubre tus áreas de interés vocacional y profesional",
    areas: [
      { key: "arte", name: "Arte y Creatividad", questions: [4, 9, 12, 20, 28, 31, 35, 39, 43, 46, 50, 56, 65, 67, 68, 77] },
      { key: "social", name: "Ciencias Sociales", questions: [6, 13, 23, 25, 34, 37, 38, 42, 49, 55, 63, 66, 70, 72, 73, 80] },
      { key: "economica", name: "Economía, Administración y Finanzas", questions: [5, 10, 15, 21, 26, 29, 33, 36, 44, 53, 56, 59, 62, 71, 76, 78] },
      { key: "tecnologia", name: "Ciencia y Tecnología", questions: [1, 7, 11, 17, 24, 30, 32, 41, 48, 51, 58, 60, 61, 64, 74, 79] },
      { key: "salud", name: "Ciencias Ecológicas, Biológicas y de Salud", questions: [2, 3, 8, 14, 16, 18, 22, 27, 40, 45, 47, 52, 54, 57, 69, 75] }
    ],
    questions: [
      { id: 1, text: "Diseñar programas de computación y explorar nuevas aplicaciones tecnológicas para uso del internet." },
      { id: 2, text: "Criar, cuidar y tratar animales domésticos y de campo." },
      { id: 3, text: "Investigar sobre áreas verdes, medioambiente y cambios climáticos." },
      { id: 4, text: "Ilustrar, dibujar y animar digitalmente." },
      { id: 5, text: "Seleccionar, capacitar y motivar al personal de una organización o empresa." },
      { id: 6, text: "Realizar excavaciones para descubrir restos del pasado." },
      { id: 7, text: "Resolver problemas de cálculo para construir un puente." },
      { id: 8, text: "Diseñar cursos para enseñar a la gente sobre temas de salud e higiene." },
      { id: 9, text: "Tocar un instrumento y componer música." },
      { id: 10, text: "Planificar las metas de una organización pública o privada a mediano y largo plazos." },
      { id: 11, text: "Diseñar y planificar la producción masiva de artículos como muebles, autos, equipos de oficina, empaques y envases para alimentos y otros." },
      { id: 12, text: "Diseñar logotipos y portadas de una revista." },
      { id: 13, text: "Organizar eventos y atender a sus asistentes." },
      { id: 14, text: "Atender la salud de personas enfermas." },
      { id: 15, text: "Controlar ingresos y egresos de fondos y presentar el balance final de una institución." },
      { id: 16, text: "Hacer experimentos con plantas (frutas, árboles, flores)." },
      { id: 17, text: "Concebir planos para viviendas, edificios y ciudadelas." },
      { id: 18, text: "Investigar y probar nuevos productos farmacéuticos." },
      { id: 19, text: "Hacer propuestas y formular estrategias para aprovechar las relaciones económicas entre dos países." },
      { id: 20, text: "Pintar, hacer esculturas, ilustrar libros de arte, etc." },
      { id: 21, text: "Elaborar campañas para introducir un nuevo producto al mercado." },
      { id: 22, text: "Examinar y tratar los problemas visuales." },
      { id: 23, text: "Defender a clientes individuales o empresas en juicios de diferente naturaleza." },
      { id: 24, text: "Diseñar máquinas que puedan simular actividades humanas." },
      { id: 25, text: "Investigar las causas y efectos de los trastornos emocionales." },
      { id: 26, text: "Supervisar las ventas de un centro comercial." },
      { id: 27, text: "Atender y realizar ejercicios a personas que tienen limitaciones físicas, problemas de lenguaje, etc." },
      { id: 28, text: "Prepararse para ser modelo profesional." },
      { id: 29, text: "Aconsejar a las personas sobre planes de ahorro e inversiones." },
      { id: 30, text: "Elaborar mapas, planos e imágenes para el estudio y análisis de datos geográficos." },
      { id: 31, text: "Diseñar juegos interactivos electrónicos para computadora." },
      { id: 32, text: "Realizar el control de calidad de los alimentos." },
      { id: 33, text: "Tener un negocio propio de tipo comercial." },
      { id: 34, text: "Escribir artículos periodísticos, cuentos, novelas y otros." },
      { id: 35, text: "Redactar guiones y libretos para un programa de tv." },
      { id: 36, text: "Organizar un plan de distribución y venta de un gran almacén." },
      { id: 37, text: "Estudiar la diversidad cultural en el ámbito rural y urbano." },
      { id: 38, text: "Gestionar y evaluar convenios internacionales de cooperación para el desarrollo social." },
      { id: 39, text: "Crear campañas publicitarias." },
      { id: 40, text: "Trabajar investigando la reproducción de peces, camarones y otros animales marinos." },
      { id: 41, text: "Dedicarse a fabricar productos alimenticios de consumo masivo." },
      { id: 42, text: "Gestionar y evaluar proyectos de desarrollo en una institución educativa y/o fundación." },
      { id: 43, text: "Rediseñar y decorar espacios físicos en viviendas, oficinas y locales comerciales." },
      { id: 44, text: "Administrar una empresa de turismo o agencias de viaje." },
      { id: 45, text: "Aplicar métodos alternativos a la medicina tradicional, para atender personas con dolencias de diversa índole." },
      { id: 46, text: "Diseñar ropa para niños, jóvenes y adultos de manera sustentable." },
      { id: 47, text: "Investigar organismos vivos para elaborar vacunas." },
      { id: 48, text: "Manejar o dar mantenimiento a dispositivos tecnológicos en aviones, barcos, radares, etc." },
      { id: 49, text: "Estudiar idiomas extranjeros —actuales y antiguos— para hacer traducción." },
      { id: 50, text: "Restaurar piezas y obras de arte." },
      { id: 51, text: "Revisar y dar mantenimiento a artefactos eléctricos, electrónicos y computadoras." },
      { id: 52, text: "Enseñar a niños de cero a cinco años." },
      { id: 53, text: "Investigar y sondear nuevos mercados." },
      { id: 54, text: "Atender la salud dental de las personas." },
      { id: 55, text: "Tratar a niños, jóvenes y adultos con problemas psicológicos." },
      { id: 56, text: "Crear estrategias de promoción y venta de nuevos productos nacionales en el mercado internacional." },
      { id: 57, text: "Planificar y recomendar dietas para personas diabéticas o con sobrepeso." },
      { id: 58, text: "Trabajar en una empresa petrolera en un cargo técnico como control de la producción." },
      { id: 59, text: "Administrar una empresa (familiar, privada o pública)." },
      { id: 60, text: "Tener un taller de reparación y mantenimiento de carros, tractores, etcétera." },
      { id: 61, text: "Ejecutar proyectos de extracción minera y metalúrgica." },
      { id: 62, text: "Asistir a directivos de multinacionales con manejo de varios idiomas." },
      { id: 63, text: "Diseñar programas educativos para niños con discapacidad." },
      { id: 64, text: "Aplicar conocimientos de estadística en investigaciones en diversas áreas (social, administrativa, salud, etcétera)." },
      { id: 65, text: "Fotografiar hechos históricos, lugares significativos, rostros, paisajes para el área publicitaria, artística, periodística y social." },
      { id: 66, text: "Trabajar en museos y bibliotecas nacionales e internacionales." },
      { id: 67, text: "Ser parte de un grupo de teatro." },
      { id: 68, text: "Producir cortometrajes, spots publicitarios, programas educativos, de ficción, etc." },
      { id: 69, text: "Estudiar la influencia entre las corrientes marinas y el clima y sus consecuencias ecológicas." },
      { id: 70, text: "Conocer las distintas religiones (su filosofía) y transmitirlas a la comunidad en general." },
      { id: 71, text: "Asesorar a inversionistas en la compra de bienes y acciones en mercados nacionales e internacionales." },
      { id: 72, text: "Estudiar grupos étnicos, sus costumbres, tradiciones, cultura y compartir sus vivencias." },
      { id: 73, text: "Explora el espacio sideral, los planetas, características y componentes." },
      { id: 74, text: "Mejorar la imagen facial y corporal de las personas aplicando diferentes técnicas." },
      { id: 75, text: "Decorar jardines de casas y parques públicos." },
      { id: 76, text: "Administrar y renovar menús de comida en un hotel o restaurante." },
      { id: 77, text: "Trabajar como presentador de televisión, locutor de radio y televisión, animador de programas culturales y concursos." },
      { id: 78, text: "Diseñar y ejecutar programas de turismo." },
      { id: 79, text: "Administrar y ordenar adecuadamente la ocupación del espacio físico de ciudades, países etc., utilizando imágenes de satélite y mapas." },
      { id: 80, text: "Organizar, planificar y administrar centros educativos." }
    ]
  }
  const calculateSocialSkillsResults = () => {
    const areaScores = {}
    let totalScore = 0

    socialSkillsTest.areas.forEach(area => {
      let areaScore = 0
      area.questions.forEach(qNum => {
        const question = socialSkillsTest.questions.find(q => q.id === qNum)
        if (answers[qNum] === question.correctAnswer) {
          areaScore++
          totalScore++
        }
      })
      areaScores[area.key] = {
        score: areaScore,
        level: areaScore <= 2 ? 'BAJO' : areaScore <= 4 ? 'PROMEDIO' : 'ALTO',
        name: area.name
      }
    })

    const overallLevel = totalScore <= 16 ? 'BAJO' : totalScore <= 32 ? 'PROMEDIO' : 'ALTO'

    return { areaScores, totalScore, overallLevel }
  }

  const calculateMultipleIntelligencesResults = () => {
    const areaScores = {}
    
    multipleIntelligencesTest.areas.forEach(area => {
      let areaScore = 0
      area.questions.forEach(qNum => {
        if (answers[qNum] === 'ME_INTERESA') {
          areaScore++
        }
      })
      areaScores[area.key] = {
        score: areaScore,
        name: area.name,
        percentage: Math.round((areaScore / area.questions.length) * 100)
      }
    })

    // Ordenar áreas por puntaje
    const sortedAreas = Object.entries(areaScores)
      .sort(([,a], [,b]) => b.score - a.score)
      .slice(0, 3)

    return { areaScores, topAreas: sortedAreas }
  }

  const getAreaInterpretation = (area, level) => {
    const interpretations = {
      expectativas: {
        BAJO: "Se muestra indeciso ante posibles decisiones que debe elegir.",
        PROMEDIO: "Presenta adecuadas expectativas.",
        ALTO: "Presenta muy buenas perspectivas, sabe lo que quiere y toma adecuadas decisiones."
      },
      padres: {
        BAJO: "Asume que sus padres no lo apoyan en sus decisiones y algunas veces tratan de imponer su voluntad.",
        PROMEDIO: "Percibe adecuadamente la relación con sus padres.",
        ALTO: "Mantiene buena comunicación con sus padres, siente que lo apoyan y lo animan en sus decisiones."
      },
      costos: {
        BAJO: "Cree que la situación económica no le permite estudiar.",
        PROMEDIO: "Cree que la situación económica le permite estudiar, pero con ciertas dificultades.",
        ALTO: "Cree que la situación económica le permitirá seguir estudios superiores."
      },
      capacidades: {
        BAJO: "Se muestra inseguro y con cierto temor ante la posibilidad de seguir estudios.",
        PROMEDIO: "Posee adecuadas capacidades para poder estudiar.",
        ALTO: "Se siente seguro de sus capacidades y fortalezas para seguir estudios."
      },
      duracion: {
        BAJO: "Percibe que el tiempo de duración de los estudios es mucho y algunas veces innecesario.",
        PROMEDIO: "Percibe que el tiempo de duración de los estudios es el adecuado.",
        ALTO: "Percibe que el tiempo de duración es el adecuado y beneficioso para su formación."
      },
      prestigio: {
        BAJO: "Asume que la mayoría de instituciones ya no tienen el reconocimiento de antes y prefieren dedicarse a otra actividad.",
        PROMEDIO: "Asume que algunas instituciones educativas de nivel superior pierden credibilidad, y piensan algunas veces realizar otra actividad.",
        ALTO: "Asume que las instituciones educativas tienen su reputación ganada a pesar de ciertos problemas."
      },
      distancia: {
        BAJO: "Piensa que la distancia es un impedimento para estudiar.",
        PROMEDIO: "Algunas veces piensa que la distancia es un inconveniente para seguir estudios superiores.",
        ALTO: "Piensa que la distancia no es un obstáculo para estudiar y por el contrario lo toma como un desafío."
      },
      futuro: {
        BAJO: "Muestra pesimismo de las oportunidades laborales al concluir con los estudios superiores.",
        PROMEDIO: "Muestra cierta desconfianza de las oportunidades que pueda conseguir, pero es perseverante.",
        ALTO: "Muestra optimismo en las oportunidades laborales al concluir sus estudios superiores."
      }
    }
    return interpretations[area]?.[level] || ""
  }
  const getCareerSuggestions = (areaKey) => {
    const careers = {
      arte: ["Diseño Gráfico", "Diseño de Interiores", "Artes Plásticas", "Fotografía", "Diseño de Modas", "Producción Audiovisual", "Teatro", "Música"],
      social: ["Psicología", "Trabajo Social", "Derecho", "Periodismo", "Educación", "Sociología", "Relaciones Internacionales", "Comunicación Social"],
      economica: ["Administración de Empresas", "Contabilidad", "Marketing", "Finanzas", "Comercio Internacional", "Gestión de Recursos Humanos", "Economía"],
      tecnologia: ["Ingeniería de Sistemas", "Arquitectura", "Ingeniería Civil", "Ingeniería Mecatrónica", "Ingeniería Industrial", "Telecomunicaciones"],
      salud: ["Medicina", "Enfermería", "Nutrición", "Biología", "Veterinaria", "Farmacia", "Odontología", "Fisioterapia"]
    }
    return careers[areaKey] || []
  }

  const handleTestSelect = (testType) => {
    setSelectedTest(testType)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResults(null)
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    const currentTest = selectedTest === 'social' ? socialSkillsTest : multipleIntelligencesTest
    if (currentQuestion < currentTest.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    let calculatedResults
    if (selectedTest === 'social') {
      calculatedResults = calculateSocialSkillsResults()
    } else {
      calculatedResults = calculateMultipleIntelligencesResults()
    }
    setResults(calculatedResults)
    setShowResults(true)
  }

  const generatePDF = () => {
  const doc = new jsPDF()
  const currentTest = selectedTest === 'social' ? socialSkillsTest : multipleIntelligencesTest
  let y = 10

  doc.setFontSize(16)
  doc.text(`TEST DE ${currentTest.name.toUpperCase()}`, 10, y)
  y += 10

  doc.setFontSize(12)
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y)
  y += 10

  doc.text("RESULTADOS:", 10, y)
  y += 10

  if (selectedTest === 'social') {
    doc.text(`Puntaje Total: ${results.totalScore}/48`, 10, y); y += 8
    doc.text(`Nivel General: ${results.overallLevel}`, 10, y); y += 10

    doc.setFontSize(14)
    doc.text("Resultados por Área:", 10, y)
    y += 10
    doc.setFontSize(12)

    Object.entries(results.areaScores).forEach(([key, data]) => {
      doc.text(`${data.name}`, 10, y); y += 6
      doc.text(`• Puntaje: ${data.score}/6`, 12, y); y += 6
      doc.text(`• Nivel: ${data.level}`, 12, y); y += 6

      const interpretation = getAreaInterpretation(key, data.level)

      const split = doc.splitTextToSize(`• Interpretación: ${interpretation}`, 180)
      doc.text(split, 12, y)
      y += split.length * 6

      y += 4
      if (y > 270) { doc.addPage(); y = 10 }
    })

  } else {
    doc.setFontSize(14)
    doc.text("Áreas de mayor interés:", 10, y)
    y += 10
    doc.setFontSize(12)

    results.topAreas.forEach(([key, data], index) => {
      doc.text(`${index + 1}. ${data.name}`, 10, y); y += 6
      doc.text(`• Puntaje: ${data.score}`, 12, y); y += 6
      doc.text(`• Porcentaje: ${data.percentage}%`, 12, y); y += 6

      const careers = getCareerSuggestions(key).join(", ")
      const split = doc.splitTextToSize(`• Carreras sugeridas: ${careers}`, 180)

      doc.text(split, 12, y)
      y += split.length * 6

      y += 4
      if (y > 270) { doc.addPage(); y = 10 }
    })
  }

  doc.save(
    `resultados-${selectedTest === 'social' ? 'habilidades-sociales' : 'inteligencias-multiples'}.pdf`
  )
}


  const resetTest = () => {
    setSelectedTest(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResults(null)
  }
  // Componente para las preguntas del test
const TestQuestions = ({ 
  selectedTest, 
  socialSkillsTest, 
  multipleIntelligencesTest, 
  currentQuestion, 
  answers, 
  handleAnswer, 
  handlePrevious, 
  handleNext, 
  handleSubmit,
  resetTest 
}) => {
  const currentTest = selectedTest === 'social' ? socialSkillsTest : multipleIntelligencesTest
  const question = currentTest.questions[currentQuestion]
  const totalQuestions = currentTest.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const allAnswered = Object.keys(answers).length === totalQuestions

  return (
    <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 md:p-12 shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">{currentTest.name}</h3>
          <button
            onClick={resetTest}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all text-sm"
          >
            Cancelar
          </button>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
          <span>Pregunta {currentQuestion + 1} de {totalQuestions}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="w-full bg-[#036280]/30 rounded-full h-2 overflow-hidden border border-[#378BA4]/20">
          <div 
            className="h-full bg-gradient-to-r from-[#378BA4] to-[#036280] transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 min-h-[200px]">
        <div className="bg-[#036280]/20 rounded-xl p-6 border border-[#378BA4]/20">
          <p className="text-white text-lg leading-relaxed">
            {question.text}
          </p>
        </div>
        {/* Answer Options */}
        <div className="mt-6 grid gap-4">
          {selectedTest === 'social' ? (
            <>
              <button
                onClick={() => handleAnswer(question.id, 'SI')}
                className={`p-4 rounded-lg border-2 transition-all font-semibold text-lg ${
                  answers[question.id] === 'SI'
                    ? 'bg-green-500/30 border-green-500 text-green-200'
                    : 'bg-[#036280]/20 border-[#378BA4]/30 text-gray-300 hover:bg-[#036280]/40 hover:border-[#378BA4]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>SÍ</span>
                  {answers[question.id] === 'SI' && <CheckCircle className="w-6 h-6" />}
                </div>
              </button>
              <button
                onClick={() => handleAnswer(question.id, 'NO')}
                className={`p-4 rounded-lg border-2 transition-all font-semibold text-lg ${
                  answers[question.id] === 'NO'
                    ? 'bg-red-500/30 border-red-500 text-red-200'
                    : 'bg-[#036280]/20 border-[#378BA4]/30 text-gray-300 hover:bg-[#036280]/40 hover:border-[#378BA4]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>NO</span>
                  {answers[question.id] === 'NO' && <XCircle className="w-6 h-6" />}
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleAnswer(question.id, 'ME_INTERESA')}
                className={`p-4 rounded-lg border-2 transition-all font-semibold text-lg ${
                  answers[question.id] === 'ME_INTERESA'
                    ? 'bg-green-500/30 border-green-500 text-green-200'
                    : 'bg-[#036280]/20 border-[#378BA4]/30 text-gray-300 hover:bg-[#036280]/40 hover:border-[#378BA4]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Me interesa</span>
                  {answers[question.id] === 'ME_INTERESA' && <CheckCircle className="w-6 h-6" />}
                </div>
              </button>
              <button
                onClick={() => handleAnswer(question.id, 'NO_ME_INTERESA')}
                className={`p-4 rounded-lg border-2 transition-all font-semibold text-lg ${
                  answers[question.id] === 'NO_ME_INTERESA'
                    ? 'bg-gray-500/30 border-gray-500 text-gray-200'
                    : 'bg-[#036280]/20 border-[#378BA4]/30 text-gray-300 hover:bg-[#036280]/40 hover:border-[#378BA4]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>No me interesa</span>
                  {answers[question.id] === 'NO_ME_INTERESA' && <XCircle className="w-6 h-6" />}
                </div>
              </button>
            </>
          )}
        </div>
      </div>
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-[#036280]/50 border border-[#378BA4]/30 text-white font-semibold rounded-lg hover:bg-[#036280] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Anterior</span>
        </button>

        {currentQuestion < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="px-6 py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Ver Resultados</span>
            <Sparkles className="w-5 h-5" />
          </button>
        )}
      </div>

      {!allAnswered && currentQuestion === totalQuestions - 1 && (
        <div className="mt-4 text-center">
          <p className="text-yellow-400 text-sm">
            Responde todas las preguntas para ver tus resultados
          </p>
        </div>
      )}
    </div>
  )
}
// Componente para los resultados
const TestResults = ({ 
  selectedTest, 
  results, 
  generatePDF, 
  resetTest,
  getAreaInterpretation,
  getCareerSuggestions
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-500/20 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">¡Test Completado!</h2>
        <p className="text-gray-300">
          {selectedTest === 'social' 
            ? 'Aquí están tus resultados de Habilidades Sociales' 
            : 'Aquí están tus resultados de Inteligencias Múltiples'}
        </p>
      </div>
      {selectedTest === 'social' ? (
        /* Resultados Habilidades Sociales */
        <>
          {/* Puntaje Total */}
          <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Resultado General</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#036280]/20 rounded-xl p-4 border border-[#378BA4]/20 text-center">
                <p className="text-gray-400 text-sm mb-1">Puntaje Total</p>
                <p className="text-3xl font-bold text-[#378BA4]">{results.totalScore}/48</p>
              </div>
              <div className="bg-[#036280]/20 rounded-xl p-4 border border-[#378BA4]/20 text-center">
                <p className="text-gray-400 text-sm mb-1">Porcentaje</p>
                <p className="text-3xl font-bold text-[#378BA4]">{Math.round((results.totalScore / 48) * 100)}%</p>
              </div>
              <div className="bg-[#036280]/20 rounded-xl p-4 border border-[#378BA4]/20 text-center">
                <p className="text-gray-400 text-sm mb-1">Nivel</p>
                <p className={`text-2xl font-bold ${
                  results.overallLevel === 'ALTO' ? 'text-green-400' :
                  results.overallLevel === 'PROMEDIO' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>{results.overallLevel}</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[#378BA4]/10 rounded-lg border border-[#378BA4]/20">
              <p className="text-gray-300 text-sm leading-relaxed">
                {results.overallLevel === 'ALTO' 
                  ? 'El joven muestra un óptimo nivel de motivación para seguir estudios superiores.'
                  : results.overallLevel === 'PROMEDIO'
                  ? 'El joven muestra un adecuado nivel de motivación para seguir estudios superiores.'
                  : 'El joven muestra un inadecuado nivel de motivación para seguir estudios superiores.'}
              </p>
            </div>
          </div>
          {/* Resultados por Área */}
          <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Resultados por Área</h3>
            <div className="space-y-4">
              {Object.entries(results.areaScores).map(([key, data]) => (
                <div key={key} className="bg-[#036280]/20 rounded-xl p-6 border border-[#378BA4]/20">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-white">{data.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[#378BA4] font-bold text-lg">{data.score}/6</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        data.level === 'ALTO' ? 'bg-green-500/20 text-green-300' :
                        data.level === 'PROMEDIO' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {data.level}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-[#036280]/30 rounded-full h-2 mb-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        data.level === 'ALTO' ? 'bg-green-500' :
                        data.level === 'PROMEDIO' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(data.score / 6) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {getAreaInterpretation(key, data.level)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
        ) : (
        /* Resultados Inteligencias Múltiples */
        <>
          {/* Top 3 Áreas */}
          <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Tus Áreas de Mayor Interés</h3>
            <div className="space-y-6">
              {results.topAreas.map(([key, data], index) => (
                <div key={key} className="bg-[#036280]/20 rounded-xl p-6 border border-[#378BA4]/20">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      index === 0 ? 'bg-yellow-500/30 text-yellow-300' :
                      index === 1 ? 'bg-gray-400/30 text-gray-300' :
                      'bg-orange-500/30 text-orange-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xl font-bold text-white mb-2">{data.name}</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[#378BA4] font-bold">{data.score} respuestas positivas</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-[#378BA4] font-bold">{data.percentage}%</span>
                      </div>
                      <div className="w-full bg-[#036280]/30 rounded-full h-2 mb-4 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#378BA4] to-[#036280] transition-all duration-500"
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-2 font-semibold">Carreras sugeridas:</p>
                        <div className="flex flex-wrap gap-2">
                          {getCareerSuggestions(key).map((career, i) => (
                            <span key={i} className="px-3 py-1 bg-[#378BA4]/20 text-[#378BA4] rounded-full text-sm border border-[#378BA4]/30">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Todas las Áreas */}
          <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Resumen Completo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.areaScores).map(([key, data]) => (
                <div key={key} className="bg-[#036280]/20 rounded-xl p-4 border border-[#378BA4]/20">
                  <h4 className="text-lg font-bold text-white mb-2">{data.name}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">{data.score} respuestas</span>
                    <span className="text-[#378BA4] font-bold">{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#036280]/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#378BA4] to-[#036280] transition-all duration-500"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={generatePDF}
            className="px-8 py-4 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all flex items-center justify-center gap-2 group"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Descargar Resultados</span>
          </button>
          <button
            onClick={resetTest}
            className="px-8 py-4 bg-transparent border-2 border-[#378BA4]/30 text-white font-bold rounded-lg hover:bg-[#036280]/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Hacer Otro Test</span>
          </button>
        </div>
      </div>
    </div>
  )
}
return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#012E4A] via-[#036280] to-[#012E4A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#378BA4] rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#036280] rounded-full blur-3xl opacity-20"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        ></div>
      </div>

      <div className="relative z-20 flex-shrink-0">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Header />
        </div>
      </div>
      <main className="flex-grow relative z-10 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">

            {/* Title Section */}
            <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#378BA4]" />
                <span className="text-[#378BA4] font-semibold uppercase tracking-wider text-sm">Descubre tu Potencial</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Tests Vocacionales
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Realiza nuestros tests especializados para conocer tus habilidades, intereses y el camino profesional ideal para ti
              </p>
            </div>

            {!selectedTest ? (
              /* Test Selection */
              <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Test 1: Habilidades Sociales */}
                <div className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl hover:border-[#378BA4]/60 transition-all hover:scale-105 group cursor-pointer"
                     onClick={() => handleTestSelect('social')}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#378BA4]/20 rounded-lg group-hover:bg-[#378BA4]/40 transition-all">
                      <Sparkles className="w-8 h-8 text-[#378BA4]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Habilidades Sociales</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Evalúa tu motivación intrínseca y extrínseca para seguir estudios superiores. Descubre cómo tus expectativas, entorno familiar y perspectivas influyen en tu decisión vocacional.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-[#378BA4] rounded-full"></div>
                      <span className="text-sm">48 preguntas</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-[#378BA4] rounded-full"></div>
                      <span className="text-sm">8 áreas evaluadas</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-[#378BA4] rounded-full"></div>
                      <span className="text-sm">15 minutos aprox.</span>
                    </div>
                    </div>

                {/* Botón comenzar */}
                <button
                  onClick={() => handleTestSelect('social')}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
                >
                  Comenzar Test
                </button>
              </div>

              {/* Test 2: Inteligencias Múltiples */}
              <div
                className="bg-[#012E4A]/80 backdrop-blur-xl rounded-2xl border border-[#378BA4]/30 p-8 shadow-2xl hover:border-[#378BA4]/60 transition-all hover:scale-105 group cursor-pointer"
                onClick={() => handleTestSelect('multiple')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#378BA4]/20 rounded-lg group-hover:bg-[#378BA4]/40 transition-all">
                    <Sparkles className="w-8 h-8 text-[#378BA4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inteligencias Múltiples</h3>
                </div>

                <p className="text-gray-300 mb-6">
                  Identifica tus áreas vocacionales según tus intereses, aptitudes y preferencias.
                  Este test te ayuda a reconocer hacia qué campos profesionales tienes más afinidad.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-[#378BA4] rounded-full"></div>
                    <span className="text-sm">80 preguntas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-[#378BA4] rounded-full"></div>
                    <span className="text-sm">5 áreas evaluadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-[#378BA4] rounded-full"></div>
                    <span className="text-sm">20 minutos aprox.</span>
                  </div>
                </div>

                <button
                  onClick={() => handleTestSelect('multiple')}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-[#378BA4] to-[#036280] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#378BA4]/50 transition-all"
                >
                  Comenzar Test
                </button>
              </div>
            </div>
            ) : (
              /* Mostrar preguntas del test */
              <TestQuestions
                selectedTest={selectedTest}
                socialSkillsTest={socialSkillsTest}
                multipleIntelligencesTest={multipleIntelligencesTest}
                currentQuestion={currentQuestion}
                answers={answers}
                handleAnswer={handleAnswer}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                handleSubmit={handleSubmit}
                resetTest={resetTest}
              />
            )}

            {showResults && (
              <TestResults
                selectedTest={selectedTest}
                results={results}
                generatePDF={generatePDF}
                resetTest={resetTest}
                getAreaInterpretation={getAreaInterpretation}
                getCareerSuggestions={getCareerSuggestions}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Botón de WhatsApp */}
      <WhatsAppButton />
    </div>
  )
}

export default StepsForVocation
