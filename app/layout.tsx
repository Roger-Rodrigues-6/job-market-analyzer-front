import "./globals.css"
import Header from "@/components/layout/Header"
import Script from "next/script"

export const metadata = {
  title: "Busca e Análise de Vagas",
  description:
    "Descubra quais habilidades o mercado de tecnologia mais exige nas vagas e compare com o que você busca.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">

        <Header />

        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8LGSGEX40D"
          strategy="afterInteractive"
        />

        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8LGSGEX40D');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vydu5u17jl");
          `}
        </Script>

      </body>
    </html>
  )
}