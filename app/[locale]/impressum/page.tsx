const ImpressumPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">ReAL ESTATE IN BERLIN</h2>
            <p className="mb-4"><strong>Angabe gemäß §5 TMG:</strong></p>
            <p>REB Consulting GmbH</p>
            <p>Geschäftsführer: Fabrizio Selvaggi</p>
            <p>Leipziger Platz 15, 10117 Berlin</p>
            <p>Telefon: 030-22392323</p>
            <p>Email: info@realestateinberlin.com</p>
            <p>Registergericht: Amtsgericht Charlottenburg</p>
            <p>Registernummer: HRB 233849</p>
            <p>Zuständige Aufsichtsbehörde: Bezirksamt Pankow von Berlin, Ordnungsamt, Fröbelstrasse 17, 10405, Berlin</p>
            <p>Gewerbeerlaubnis nach §34c GewO erteilt durch das Gewerbeamt Pankow von Berlin</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Informationspflicht nach §36 VSBG</h3>
            <p className="leading-relaxed">
              Der Immobilienverband Deutschland IVD e.V. hat mit Beteiligung des Verbraucherverbandes Verband Privater Bauherren e.V. (VPB) eine Schlichtungsstelle nach Maßgabe des Verbraucherstreitbeilegungsgesetzes (VSBG) eingerichtet. Vor der Schlichtungsstelle können u. a. Streitigkeiten zwischen Verbrauchern und Mitgliedern des IVD in einem außergerichtlichen Schlichtungsverfahren beigelegt werden. REB Consulting GmbH ist Mitgliederin im IVD und nimmt an einem Schlichtungsverfahren bei Ombudsmann Immobilien IVD/VPB Grunderwerb und Verwaltung teil.
            </p>
            <p className="leading-relaxed mt-4">
              Die Anschrift der Schlichtungsstelle lautet: Ombudsmann Immobilien IVD/VPB –Grunderwerb und -verwaltung, Littenstraße 10, 10179 Berlin. Weitere Informationen zur Schlichtungsstelle (z.B. weitere Kommunikationsdaten, Verfahrensordnung) erhalten Sie unter{" "}
              <a href="http://www.ombudsmann-immobilien.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                http://www.ombudsmann-immobilien.net
              </a>.
            </p>
            <p className="leading-relaxed mt-4">
              Am Schlichtungsverfahren bei andere Schlichtungstelle nimmt die Firma REB Consulting GmbH gründsätzlich nicht teil.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Haftung für Inhalte</h3>
            <p className="leading-relaxed">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Haftung für Links</h3>
            <p className="leading-relaxed">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Urheberrecht</h3>
            <p className="leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
