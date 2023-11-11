import { Alert, Box, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import JustifiedTypography from "../common/JustifiedTypography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const Home = (testParams: any) => {
  const theme = useTheme();
  const aboutNutrifom =
    'Die nutrifom GmbH stellt ihre Kunden in den Vordergrund. Seit 2023 schafft die nutrifom GmbH neue Lösungen zur Unterstützung bei einer gesunden Ernährung. "nutrifom" die Webanwendung stellt hierbei das Erreichen deiner individuellen Ziele in den Fokus.';

  const aboutNutrifomFoodLog =
    "Das Nutriprotokoll dient der Protokollierung deiner Ernährung. Sowohl Speisen als auch Getränke kannst du hier eintragen. Auswählen kannst du hierbei aus einer großen Datenbank an Nahrungsmitteln. Auch Rezepte, welche du in unserem Rezeptebereich entdeckt und nachgekocht hast, kannst du hier portionsweise eintragen. Deine tägliche Kalorienbilanz wird übersichtlich dargestellt, wobei du auch die Zusammensetzung deiner Ernährung einsehen kannst.";

  const aboutNutrifomWeight =
    "Der Gewichtsbereich dient der Protokollierung deines Gewichts. Täglich kannst du hier dein Gewicht eintragen und deinen Gewichtsverlauf beobachten. Auch zur Berechnung deines individuellen Energiebedarfs ist dein Gewichtsverlauf hilfreich.";

  const aboutNutrifomCalc =
    "Der Bedarfsrechner dient zur Berechnung deines Energiebedarfs. Dein Energiebedarf ist sehr individuell und hängt neben Parametern wie Alter, Größe, Geschlecht oder Gewicht auch von subjektiven Faktoren ab. Beispiele hierfür sind die Körpergewichtszusammensetzung, der Hormonhaushalt oder Stress. Daher verwendet der Bedarfsrechner zu Beginn eine standardisierte Formel, später, wenn ausreichend Daten vorhanden sind, jedoch dein individuelles Nutri- und Gewichtsprotokoll. Darüber hinaus hast du die Möglichkeit dein individuelles Ziel bezüglich deines Körpergewichts anzugeben, welches dann bei der Berechnung berücksichtigt wird.";

  const aboutNutrifomRecipes =
    'Im Rezeptebereich steht dir eine Auswahl an gesunden Rezepten zur Verfügung. Die Nährwerte der Gerichte sind übersichtlich dargestellt und können dir dabei helfen dein individuelles Kalorienziel zu erreichen. Rezepte mit einer höheren Kaloriendichte werden hierbei unter der Kategorie "Aufbauen" gelistet, während Rezepte mit niedrigerer Kaloriendichte der Kategorie "Definieren" zugeordnet sind. Beachte: auch die Rezepte mit höherer Kaloriendichte sind gesund!';

  const infoTextMicros =
    "Mineralstoffe und Vitamine erfüllen wichtige Funktionen innerhalb des Körpers. Besonders Obst und Gemüse, aber auch Vollkornprodukte sind zur Aufnahme von ausreichend Mikronährstoffen geeignet. Empfohlen werden täglich mindestens fünf Portionen rohes oder schonend zubereitetes Gemüse (min. 400g) und Obst (min. 250g). Als besonders mikronährstoffreich gilt hierbei grünes Gemüse.";

  const infoTextProteins =
    "Proteine sättigen dich besonders. Außerdem sind sie essentiell für Muskelaufbau und -erhalt. Die Quelle der Proteine entscheidet über die Qualität und Verwertbarkeit der Proteine. Tierische Proteine haben meist eine höhere biologische Wertigkeit als pflanzliche Proteine. Auch die Kombination bestimmter Nahrungsmittel kann dir helfen die biologische Wertigkeit deiner Mahlzeit zu erhöhen. Das geht beispielsweise mit Kartoffeln + Ei, Soja + Reis oder Mais + Bohnen.";

  const infoTextFat =
    "Achte bei dem Verzehr von Fetten auch auf die Quellen. Besonders Nüsse und pflanzliche Öle liefern gesunde ungesättigte Fettsäuren, welche positive Effekte auf den Körper haben. Beispiele hierfür sind die Hirnfuktion oder das Immunsystem.";

  const infoTextCarbs =
    "Besonders der Verzehr komplexer Kohlenhydraten ist vorteilhaft. Sie dienen als Träger von Mineralstoffen, Vitaminen und Ballaststoffen. Versuche deine Kohlenhydrate aus Vollkornprodukten anstelle von Weißmehlprodukten oder mit Zucker gesüßten Waren zu gewinnen.";

  const aboutFeatureTexts = [
    {
      title: "Nutriprotokoll",
      url: "/foodlog",
      description: aboutNutrifomFoodLog,
    },
    { title: "Gewicht", url: "/weight", description: aboutNutrifomWeight },
    { title: "Bedarfsrechner", url: "/calc", description: aboutNutrifomCalc },
    { title: "Rezepte", url: "/recipes", description: aboutNutrifomRecipes },
  ];

  const infoTexts = [
    { title: "Mikronährstoffe:", description: infoTextMicros },
    { title: "Proteine:", description: infoTextProteins },
    { title: "Fette:", description: infoTextFat },
    { title: "Kohlenhydrate:", description: infoTextCarbs },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "60%",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "150%" }}>Über uns</Typography>
          <JustifiedTypography text={aboutNutrifom} />
        </Box>
        <Box
          sx={{
            paddingTop: 2,
          }}
        >
          <Typography sx={{ fontSize: "150%" }}>Unsere Features</Typography>
          {aboutFeatureTexts.map((aboutFeatureText) => (
            <Box>
              <Link
                to={aboutFeatureText.url}
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    paddingTop: 1,
                    color: theme.palette.primary.main,
                  }}
                >
                  {aboutFeatureText.title}
                </Typography>
              </Link>
              <JustifiedTypography text={aboutFeatureText.description} />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            paddingTop: 2,
          }}
        >
          <Typography sx={{ fontSize: "150%" }}>Tipps zur Ernährung</Typography>
          <Stack
            sx={{
              paddingTop: 2,
            }}
            spacing={2}
          >
            {infoTexts.map((infoText) => (
              <Box>
                <Alert
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                  }}
                  icon={
                    <TaskAltIcon sx={{ color: theme.palette.primary.main }} />
                  }
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {infoText.title}
                  </Typography>
                  <JustifiedTypography text={infoText.description} />
                </Alert>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};
