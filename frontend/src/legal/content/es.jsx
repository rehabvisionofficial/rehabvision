// =============================================================================
// Texto en español de las políticas. Debe decir exactamente lo mismo que en.jsx.
// Traducción para revisar por un hablante nativo o un abogado.
// =============================================================================

import { Link } from 'react-router'
import { BUSINESS as B, PLANS, POLICY as P, mailto } from '../business'

const planLabel = (plan, i) =>
  plan.maxPatients ? `Hasta ${plan.maxPatients} pacientes` : `Más de ${PLANS[i - 1].maxPatients} pacientes`

export default {
  privacy: {
    title: 'Política de privacidad',
    Body: () => (
      <>
        <p>
          Esta política explica qué datos personales recoge {B.name} («nosotros»), con sede en el Líbano,
          por qué, quién puede verlos y qué opciones tienes. Para cualquier pregunta o solicitud sobre privacidad,
          escribe a {mailto(B.privacyEmail)}.
        </p>

        <h2>Qué recogemos</h2>
        <ul>
          <li><b>Tu cuenta:</b> nombre, dirección de correo, si eres paciente o fisioterapeuta, y tu contraseña. Guardamos la contraseña solo como un hash irreversible, nunca la contraseña en sí.</li>
          <li><b>Restablecimiento de contraseña:</b> si usas «Contraseña olvidada», te enviamos por correo un enlace de un solo uso. Solo guardamos una versión cifrada (hash) de su código, y el enlace caduca a los 30 minutos.</li>
          <li><b>Fisioterapeutas:</b> un ID público (como PT-ABC234) que creamos para que los pacientes puedan encontrarte.</li>
          <li><b>Pacientes:</b> a qué fisioterapeuta te has vinculado y los ejercicios que te asigna: ejercicio, lado, ángulos, rango seguro, número de repeticiones, cuándo parar y su confirmación de que tienes autorización para el ejercicio.</li>
          <li><b>Resultados de los ejercicios:</b> en cada sesión, el ejercicio y el lado, el plan en ese momento, el ángulo máximo alcanzado en cada repetición y si llegó al objetivo, el número de repeticiones, una puntuación de dolor opcional, y la fecha y la hora.</li>
          <li><b>Datos técnicos:</b> tu dirección IP se guarda brevemente en la memoria del servidor para limitar cuántas solicitudes puede hacer una conexión. No se guarda en nuestra base de datos. Nuestros proveedores de alojamiento pueden conservar sus propios registros.</li>
          <li><b>Facturación (solo fisioterapeutas e instituciones):</b> los datos necesarios para facturarte y registrar tus pagos. Los pagos se nos hacen directamente, fuera de la aplicación; nunca vemos ni guardamos números de tarjeta en la aplicación.</li>
          <li><b>Verificación de fisioterapeutas:</b> las fotos o escaneos que subes de tu documento de identidad o pasaporte (anverso y reverso), un selfi en directo con tu documento, tu carné de la OPTL (anverso y reverso) y el recibo de la cuota del año, tu título o convalidación, y la prueba de tu lugar de trabajo; opcionalmente, el seguro y los certificados de formación. También guardamos tu número de teléfono, tu región de precios, el nombre de tu consulta, los idiomas en los que atiendes y la decisión de la revisión.</li>
          <li><b>Ayuda económica (fisioterapeutas que la solicitan):</b> las vías de ayuda que eliges y sus documentos: declaración y justificantes de ingresos, carta del municipio o del mokhtar, fechas de graduación, pruebas de desplazamiento, daños o lesiones, cartas de compromiso o de patrocinio, y la decisión.</li>
          <li><b>Pagos:</b> el plan que eliges, la referencia de transferencia de Whish Money u OMT que introduces, el importe y hasta cuándo has pagado.</li>
          <li><b>Dolor e incidentes:</b> después de una sesión, los pacientes pueden valorar su dolor de 0 a 10 y describir un problema. Tu fisioterapeuta lo ve junto con la sesión.</li>
        </ul>
        <p>Los planes y resultados de ejercicio son <b>datos de salud</b>. Solo los usamos para prestarte el servicio a ti y a tu fisioterapeuta.</p>

        <h2>Qué no recogemos</h2>
        <ul>
          <li><b>Ningún vídeo ni foto de tus ejercicios.</b> La imagen de la cámara se analiza en tu propio dispositivo para medir el ángulo de tu articulación. Nunca se sube ni se guarda. Solo se envían los números indicados arriba.</li>
          <li><b>Ningún rastreo.</b> {B.name} no tiene herramientas de analítica, publicidad ni redes sociales, y no instala cookies. Consulta <Link to="/cookies">Cookies y almacenamiento</Link>.</li>
          <li>No vendemos tus datos ni los usamos para publicidad.</li>
        </ul>

        <h2>Quién puede ver tus datos</h2>
        <ul>
          <li><b>Tu fisioterapeuta</b>, cuando te vinculas a él: tu nombre, tu correo, los ejercicios asignados, tus 50 resultados más recientes (incluidos los anteriores a la vinculación) y un resumen semanal de «necesitan atención» basado en ellos. Si quitas a tu fisioterapeuta, ya no podrá ver ninguno de tus datos en {B.name} y se borrarán los ejercicios que te asignó.</li>
          <li><b>Los pacientes</b> que introducen el ID público de un fisioterapeuta ven su nombre y su ID.</li>
          <li><b>Los proveedores de servicios</b> que hacen funcionar el servicio para nosotros: Netlify (aloja el sitio web), Render (ejecuta nuestro servidor), nuestra base de datos privada MongoDB y nuestro proveedor de correo (envía los correos de restablecimiento de contraseña). Solo pueden usar los datos para prestarnos su servicio.</li>
          <li>Las autoridades, solo cuando la ley nos obligue a compartirlos.</li>
          <li><b>Nuestro equipo de revisión</b> ve los documentos de verificación y de ayuda de los fisioterapeutas, solo para decidir sobre ellos. Con tu consentimiento podemos comprobarlos con el Colegio de Fisioterapeutas (OPTL) o con quien los emitió, y auditar cada trimestre alrededor del 10 % de los expedientes de ayuda aprobados.</li>
          <li><b>Los pacientes con sesión iniciada</b> ven el nombre, la región, la consulta, los idiomas y la insignia de verificado de los fisioterapeutas que eligen aparecer en el directorio.</li>
        </ul>

        <h2>Por qué los usamos (base jurídica)</h2>
        <ul>
          <li>Datos de cuenta y facturación: para prestar el servicio que contrataste.</li>
          <li>Datos de salud (planes y resultados de ejercicio): con tu consentimiento explícito, dado al crear una cuenta de paciente. Puedes retirarlo en cualquier momento quitando a tu fisioterapeuta o pidiéndonos que borremos tu cuenta. La retirada no afecta al uso anterior.</li>
          <li>Dirección IP para limitar solicitudes: para mantener el servicio seguro y disponible.</li>
        </ul>
        <p>Cumplimos la Ley libanesa n.º 81 de 2018 sobre transacciones electrónicas y datos personales y, para los usuarios de la Unión Europea, el Reglamento General de Protección de Datos (RGPD).</p>

        <h2>Dónde se guardan tus datos</h2>
        <p>Nuestros servidores y nuestra base de datos pueden estar fuera de tu país. Cuando la ley lo exige, aplicamos las garantías adecuadas a estas transferencias.</p>

        <h2>Mensajes hablados</h2>
        <p>El entrenador de ejercicios dice frases cortas (como «Muy bien») usando la síntesis de voz integrada de tu navegador. Algunos navegadores usan para ello un servicio de voz en línea de su fabricante. Las frases son las mismas para todos y no contienen datos personales.</p>

        <h2>Cuánto tiempo los conservamos</h2>
        <p>Conservamos tu cuenta y tus resultados mientras tu cuenta esté abierta. Cuando nos pidas borrar tu cuenta, la borraremos junto con sus resultados en un plazo de {P.deletionDays} días, salvo los registros que la ley nos obligue a conservar (como las facturas).</p>
        <p>Los documentos de verificación y de ayuda se conservan mientras tu cuenta esté abierta, para poder revisarlos cada año y auditar las ayudas. Cuando termina un periodo de ayuda, borramos sus documentos en un plazo de 12 meses, salvo que una auditoría o una disputa los necesite.</p>

        <h2>Tus derechos</h2>
        <p>Puedes pedir ver los datos que tenemos sobre ti, corregirlos, borrarlos, recibir una copia u oponerte a su uso o limitarlo. Para hacer una solicitud, incluido cerrar tu cuenta, escribe a {mailto(B.privacyEmail)}. Respondemos en un plazo de {P.deletionDays} días. Si no quedas satisfecho, puedes reclamar ante la autoridad de protección de datos de tu país de residencia.</p>

        <h2>Seguridad</h2>
        <p>Las contraseñas se guardan solo como hash. En la aplicación hay que iniciar sesión para ver cualquier dato personal, y los datos de un paciente solo los pueden ver ese paciente y su fisioterapeuta vinculado. Nuestro equipo y nuestros proveedores solo acceden a los datos cuando es necesario para hacer funcionar o reparar el servicio. Ningún sistema es totalmente seguro; si una brecha te afecta, te lo comunicaremos como exige la ley.</p>

        <h2>Menores</h2>
        <p>Los pacientes menores de {P.adultAge} años solo pueden usar {B.name} bajo la supervisión de un progenitor o tutor, que crea y gestiona la cuenta y da los consentimientos en nombre del menor.</p>

        <h2>Cambios</h2>
        <p>Actualizaremos esta página cuando cambie lo que recogemos, y cambiaremos la fecha de arriba.</p>
      </>
    ),
  },

  terms: {
    title: 'Condiciones de uso',
    Body: () => (
      <>
        <p>
          Estas condiciones se aplican cuando usas {B.name}, con sede en el Líbano. Al crear una cuenta aceptas estas
          condiciones, la <Link to="/privacy">Política de privacidad</Link> y, en el caso de fisioterapeutas e instituciones,
          la <Link to="/pricing">Política de precios, cancelación y reembolsos</Link>.
        </p>

        <h2>Qué es {B.name}</h2>
        <p>Una herramienta que permite a un fisioterapeuta asignar ejercicios en casa y al paciente hacerlos delante de una cámara, con indicaciones en pantalla y habladas sobre el ángulo de la articulación y las repeticiones.</p>

        <h2>No es consejo médico ni sirve para emergencias</h2>
        <ul>
          <li>{B.name} no diagnostica ni trata ninguna enfermedad y no sustituye a tu fisioterapeuta ni a tu médico.</li>
          <li>Los ángulos que mide la cámara son estimaciones. Pueden ser erróneos por la iluminación, la posición de la cámara, la ropa o la parte del cuerpo que se ve.</li>
          <li>Sigue las instrucciones de tu fisioterapeuta. Detente y pide consejo si sientes dolor o síntomas nuevos, o si algo de tu plan indica que pares.</li>
          <li>En caso de emergencia, llama al número de emergencias local.</li>
        </ul>

        <h2>Tu cuenta</h2>
        <ul>
          <li>Da datos correctos y mantén tu contraseña en secreto. Una cuenta es para una sola persona.</li>
          <li>Los pacientes menores de {P.adultAge} años solo pueden usar {B.name} bajo la supervisión de un progenitor o tutor, que es responsable de la cuenta.</li>
        </ul>

        <h2>Fisioterapeutas e instituciones</h2>
        <ul>
          <li>Debes estar cualificado y autorizado para ejercer donde tratas a los pacientes.</li>
          <li>Eres responsable de los ejercicios, ángulos, rangos seguros y criterios para parar que asignas, y de confirmar que cada paciente tiene autorización clínica para ellos.</li>
          <li>Usa los datos de los pacientes solo para tratarlos y cumple las normas profesionales y de datos de salud que te correspondan.</li>
          <li>Las suscripciones, la cancelación y los reembolsos se rigen por la <Link to="/pricing">Política de precios, cancelación y reembolsos</Link>.</li>
          <li><b>Verificación:</b> los pacientes solo pueden encontrarte y añadirte cuando nuestro equipo ha verificado tus documentos. Los revisamos cada año, con un periodo de gracia de 30 días. Podemos suspender una cuenta cuyos documentos sean falsos o estén caducados.</li>
          <li><b>Atención a distancia:</b> {B.name} apoya los ejercicios en casa que tú prescribes. Asegúrate de que cualquier seguimiento a distancia esté permitido por las normas que te aplican; World Physiotherapy indica que la telesalud no está permitida en el Líbano, así que pide asesoramiento por escrito antes de ofrecer tratamiento a distancia.</li>
          <li><b>La ayuda económica</b> la decide nuestro equipo. Los documentos falsos suponen la retirada de la ayuda y la imposibilidad de volver a solicitarla durante 12 meses.</li>
        </ul>

        <h2>Precio</h2>
        <p>{B.name} es gratis para los pacientes. Los fisioterapeutas pagan un plan mensual, por transferencia de Whish Money u OMT, que nosotros confirmamos. Los planes, descuentos, ayudas y reembolsos se explican en la <Link to="/pricing">Política de precios, cancelación y reembolsos</Link>.</p>

        <h2>Uso aceptable</h2>
        <p>No hagas un mal uso del servicio: no accedas a cuentas ni datos de otras personas, no intentes romperlo ni sobrecargarlo y no hagas nada ilegal.</p>

        <h2>Disponibilidad y cambios</h2>
        <p>Trabajamos para que {B.name} funcione, pero no podemos prometer que esté siempre disponible o libre de errores. Podemos cambiar o retirar funciones, y actualizaremos estas condiciones cuando lo hagamos.</p>

        <h2>Responsabilidad</h2>
        <p>No somos responsables de las pérdidas causadas por usar ejercicios o mediciones en contra del consejo de tu fisioterapeuta, ni por hechos fuera de nuestro control. Nada en estas condiciones limita la responsabilidad que la ley no permite limitar, ni tus derechos como consumidor.</p>

        <h2>Dejar de usar el servicio</h2>
        <p>Puedes dejar de usar {B.name} en cualquier momento y pedirnos que borremos tu cuenta ({mailto(B.privacyEmail)}). Podemos suspender una cuenta que incumpla estas condiciones.</p>

        <h2>Ley aplicable y contacto</h2>
        <p>Estas condiciones se rigen por las leyes del Líbano, y las disputas las resuelven los tribunales competentes del Líbano, sin perjuicio de los derechos que te concedan las leyes del país donde vives. Preguntas: {mailto(B.email)}.</p>
      </>
    ),
  },

  pricing: {
    title: 'Precios, cancelación y reembolsos',
    Body: () => (
      <>
        <p>{B.name} es <b>gratis para los pacientes</b>. Cada fisioterapeuta paga un plan mensual según cuántos pacientes activos tiene. Pagas por transferencia de Whish Money u OMT e introduces la referencia del recibo en la aplicación; la confirmamos en 1 día laborable.</p>

        <h2>Precios</h2>
        <table className="data-table">
          <thead><tr><th>Pacientes vinculados a la vez</th><th>Precio por fisioterapeuta</th></tr></thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <tr key={plan.price}><td>{planLabel(plan, i)}</td><td>{plan.price} $ al mes</td></tr>
            ))}
          </tbody>
        </table>
        <p>Los precios están en dólares estadounidenses. Cada parte paga sus propias comisiones bancarias o de transferencia. Si se aplica algún impuesto, aparece en la factura. Una institución paga el mismo precio por cada uno de sus fisioterapeutas, salvo que acordemos otra cosa por escrito.</p>

        <h2>Descuento regional</h2>
        <p>El lugar donde ejerces fija un descuento del 0 % (Beirut) al 50 % (Akkar), según los precios habituales de las consultas y la necesidad de la región: D = mín(50 %, 0,5 × (1 − P / 35) + 0,3 × N), redondeado al 5 % más cercano, donde P es el precio habitual de una sesión en la región en dólares y N una puntuación de necesidad de 0 a 1. Tu prueba de lugar de trabajo confirma la región.</p>

        <h2>Ayuda económica</h2>
        <ul>
          <li>Cinco vías se suman al descuento regional: inicio de carrera (+30 %, una vez), dificultades económicas (+10 a +40 %), guerra o desplazamiento (+20 a +30 %), compromiso de atención comunitaria (+20 %) y plazas patrocinadas (hasta el 100 %, pagadas por una ONG, el Ministerio de Salud Pública, la OPTL o una universidad).</li>
          <li>El descuento total está limitado al 75 % y el precio nunca baja de 6 $ al mes, salvo que un patrocinador pague tu plaza.</li>
          <li>Decidimos en 5 días laborables. Los totales por encima del 50 % necesitan un segundo revisor. La ayuda dura 6 meses y se renueva con justificantes nuevos.</li>
        </ul>

        <h2>Pago anual, piloto y recomendaciones</h2>
        <ul>
          <li>Paga 12 meses por adelantado al precio de 10.</li>
          <li>Los fisioterapeutas del piloto tienen el primer mes gratis y después mitad de precio durante 12 meses.</li>
          <li>Recomienda a otro fisioterapeuta con tu ID público: los dos recibís un mes gratis cuando esté verificado.</li>
        </ul>

        <h2>Facturación</h2>
        <ul>
          <li>Se te factura cada mes, por adelantado, desde el día en que empieza tu suscripción.</li>
          <li>Tu plan depende de cuántos pacientes están vinculados a ti a la vez. Si superas el límite de tu plan, te pediremos que pases al plan siguiente a partir de tu próximo mes de facturación. Nunca cobramos meses pasados.</li>
          <li>Pasar a un plan mayor tiene efecto inmediato; el nuevo precio empieza en tu próximo mes de facturación. Pasar a un plan menor tiene efecto a partir de tu próximo mes de facturación, siempre que tus pacientes quepan en él.</li>
          <li>No puedes vincular más pacientes de los que permite tu plan; primero elige un plan mayor en Plan y facturación.</li>
        </ul>

        <h2>Cancelación</h2>
        <ul>
          <li>Puedes cancelar en cualquier momento escribiendo a {mailto(B.email)}. No hay permanencia mínima ni penalización por cancelar.</li>
          <li>La cancelación tiene efecto al final del mes que ya has pagado. Mantienes el acceso completo hasta entonces y no se te vuelve a cobrar.</li>
          <li>Después podemos limitar tu cuenta para que no puedas vincular nuevos pacientes ni asignar ejercicios hasta que vuelvas a suscribirte. Tus pacientes conservan sus cuentas gratuitas y sus propios resultados.</li>
        </ul>

        <h2>Reembolsos</h2>
        <ul>
          <li><b>Garantía del primer pago:</b> si eres nuevo en {B.name}, puedes obtener el reembolso completo de tu primer pago pidiéndolo en un plazo de {P.moneyBackDays} días desde que lo hiciste.</li>
          <li><b>Siempre se reembolsan:</b> los pagos duplicados, los errores de facturación y cualquier cargo hecho después de que tu cancelación tuviera efecto.</li>
          <li><b>Interrupciones largas:</b> si {B.name} no está disponible durante más de {P.outageHours} horas seguidas por un problema nuestro, te reembolsamos o abonamos esos días, de forma proporcional, si lo pides.</li>
          <li><b>Si cerramos el servicio</b> o cerramos tu cuenta sin que hayas incumplido las <Link to="/terms">Condiciones</Link>, te reembolsamos la parte no usada del mes pagado.</li>
          <li>En los demás casos, los meses ya empezados no se reembolsan, tampoco si cancelas a mitad de mes.</li>
          <li>Las cuentas cerradas por incumplir las Condiciones no reciben reembolso del mes en curso.</li>
        </ul>

        <h2>Cómo pedir un reembolso</h2>
        <p>Escribe a {mailto(B.email)} en un plazo de {P.refundRequestDays} días desde el pago, con tu nombre y la fecha del pago. Respondemos en {P.refundReplyDays} días hábiles y pagamos los reembolsos aprobados en {P.refundPayDays} días, por el mismo medio con el que pagaste siempre que sea posible.</p>

        <h2>Retraso en el pago</h2>
        <p>Si una factura no se paga en un plazo de {P.latePaymentDays} días desde su vencimiento, podemos limitar tu cuenta a solo consulta hasta que se pague. Nunca borramos los datos de los pacientes por un retraso en el pago.</p>

        <h2>Cambios de precio</h2>
        <p>Te avisaremos por correo al menos {P.priceNoticeDays} días antes de un cambio de precio. El nuevo precio se aplica desde tu primer mes de facturación posterior al aviso, y puedes cancelar antes.</p>

        <h2>Tus derechos legales</h2>
        <p>Nada en esta política limita los derechos que te reconozcan las leyes de protección del consumidor que te sean aplicables.</p>
      </>
    ),
  },

  cookies: {
    title: 'Cookies y almacenamiento',
    Body: () => (
      <>
        <p>{B.name} <b>no instala cookies</b> ni usa analítica, publicidad o rastreadores de terceros. Guarda unos pocos elementos en el almacenamiento local de tu navegador, solo para que funcionen las funciones que usas:</p>
        <table className="data-table">
          <thead><tr><th>Elemento</th><th>Para qué sirve</th><th>Cuándo se borra</th></tr></thead>
          <tbody>
            <tr><td><code>authToken</code></td><td>Mantiene tu sesión iniciada</td><td>Cuando cierras sesión o cuando caduca el inicio de sesión</td></tr>
            <tr><td><code>pendingSessions</code></td><td>Resultados de ejercicios guardados sin conexión, para enviarlos más tarde</td><td>En cuanto se envían</td></tr>
            <tr><td><code>appLanguage</code></td><td>El idioma que elegiste para la aplicación</td><td>Cuando borras los datos del navegador</td></tr>
            <tr><td><code>coachLanguage</code></td><td>El idioma del entrenador que elegiste</td><td>Cuando borras los datos del navegador</td></tr>
            <tr><td><code>storageNoticeSeen</code></td><td>Recuerda que cerraste el aviso de almacenamiento</td><td>Cuando borras los datos del navegador</td></tr>
          </tbody>
        </table>
        <p>Estos elementos son estrictamente necesarios para el servicio que pediste, por eso no pedimos consentimiento para usarlos. Si alguna vez añadimos cookies o analítica opcionales, te pediremos antes tu consentimiento y podrás rechazarlo.</p>
        <p>Puedes borrar estos elementos en cualquier momento desde los ajustes del navegador (para este sitio: borrar datos del sitio). Se cerrará tu sesión y se perderán los resultados que aún no se hayan enviado.</p>
      </>
    ),
  },

  accessibility: {
    title: 'Accesibilidad',
    Body: () => (
      <>
        <p>Queremos que todas las personas, incluidas las que sienten dolor, las mayores y las que tienen alguna discapacidad, puedan usar {B.name}. Nuestro objetivo es cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 en el nivel AA.</p>
        <h2>Lo que hemos hecho</h2>
        <ul>
          <li>Texto grande por defecto (18 px), colores de alto contraste y botones de al menos 44 píxeles de alto.</li>
          <li>Todo se puede usar con el teclado, con un contorno de foco bien visible.</li>
          <li>Los campos de los formularios tienen etiquetas visibles y los errores se explican con palabras, no solo con colores.</li>
          <li>El entrenador de ejercicios da sus indicaciones en voz alta, así que no hace falta mirar la pantalla.</li>
          <li>Las animaciones se reducen si tu dispositivo está configurado para reducir el movimiento.</li>
          <li>La aplicación, el entrenador de ejercicios y estas políticas están disponibles en ocho idiomas: árabe (de derecha a izquierda), armenio occidental, inglés, francés, español, alemán, italiano y turco.</li>
        </ul>
        <h2>Limitaciones conocidas</h2>
        <ul>
          <li>El entrenador de ejercicios necesita una cámara y que se vea suficiente parte de tu cuerpo para medir los ángulos.</li>
          <li>Algunos mensajes técnicos poco frecuentes del servidor, que solo aparecen si algo falla dentro de la aplicación, están solo en inglés.</li>
          <li>El sitio aún no ha sido auditado por un experto independiente en accesibilidad.</li>
        </ul>
        <h2>Cuéntanos un problema</h2>
        <p>Si algo es difícil de usar, escribe a {mailto(B.email)} e indica qué página y qué ha pasado. Te responderemos y trabajaremos en una solución.</p>
      </>
    ),
  },
}
