// =============================================================================
// Politikaların Türkçe metni. en.jsx ile tam olarak aynı şeyi söylemelidir.
// Çeviri, anadili Türkçe olan biri veya bir hukukçu tarafından kontrol edilmeli.
// =============================================================================

import { Link } from 'react-router'
import { BUSINESS as B, PLANS, POLICY as P, mailto } from '../business'

const planLabel = (plan, i) =>
  plan.maxPatients ? `En fazla ${plan.maxPatients} hasta` : `${PLANS[i - 1].maxPatients} hastadan fazla`

export default {
  privacy: {
    title: 'Gizlilik politikası',
    Body: () => (
      <>
        <p>
          Bu politika, Lübnan merkezli {B.name}’ın (“biz”) hangi kişisel verileri topladığını, neden topladığını,
          bunları kimlerin görebileceğini ve seçeneklerinizi açıklar. Gizlilikle ilgili her türlü soru veya talep
          için {mailto(B.privacyEmail)} adresine yazın.
        </p>

        <h2>Ne topluyoruz</h2>
        <ul>
          <li><b>Hesabınız:</b> adınız, e-posta adresiniz, hasta mı yoksa fizyoterapist mi olduğunuz ve şifreniz. Şifreyi yalnızca tek yönlü bir özet (hash) olarak saklarız, şifrenin kendisini asla saklamayız.</li>
          <li><b>Şifre sıfırlama:</b> “Şifremi unuttum” özelliğini kullanırsanız size tek kullanımlık bir bağlantı e-postalarız. Kodun yalnızca karıştırılmış (hash) bir sürümünü saklarız ve bağlantı 30 dakika sonra geçerliliğini yitirir.</li>
          <li><b>Fizyoterapistler:</b> hastaların sizi bulabilmesi için oluşturduğumuz herkese açık bir kimlik (PT-ABC234 gibi).</li>
          <li><b>Hastalar:</b> bağlandığınız fizyoterapist ve size atadığı egzersizler: egzersiz, taraf, açılar, güvenli aralık, tekrar sayısı, ne zaman durulacağı ve egzersiz için uygun olduğunuza dair onayı.</li>
          <li><b>Egzersiz sonuçları:</b> her seans için egzersiz ve taraf, o andaki plan, her tekrarda ulaşılan en yüksek açı ve hedefe ulaşılıp ulaşılmadığı, tekrar sayısı, isteğe bağlı bir ağrı puanı ile tarih ve saat.</li>
          <li><b>Teknik veriler:</b> IP adresiniz, bir bağlantının yapabileceği istek sayısını sınırlamak için sunucunun belleğinde kısa süre tutulur. Veritabanımıza kaydedilmez. Barındırma sağlayıcılarımız kendi sunucu kayıtlarını tutabilir.</li>
          <li><b>Faturalama (yalnızca fizyoterapistler ve kurumlar):</b> size fatura kesmek ve ödemelerinizi kaydetmek için gereken bilgiler. Ödemeler uygulama dışında doğrudan bize yapılır; uygulamada kart numaralarını asla görmeyiz ve saklamayız.</li>
          <li><b>Fizyoterapist doğrulaması:</b> yüklediğiniz kimlik veya pasaport (ön ve arka yüz) fotoğrafları ya da taramaları, kimliğinizle çekilmiş canlı bir selfie, OPTL kartınız (ön ve arka yüz) ve bu yılın aidat makbuzu, diplomanız veya denklik belgeniz ve iş yeri belgeniz; isteğe bağlı olarak sigorta ve eğitim sertifikaları. Ayrıca telefon numaranızı, fiyat bölgenizi, klinik adınızı, tedavi ettiğiniz dilleri ve inceleme kararını saklarız.</li>
          <li><b>Maddi destek (başvuran fizyoterapistler):</b> seçtiğiniz destek yolları ve belgeleri: gelir beyanı ve kanıtı, belediye veya muhtar yazısı, mezuniyet tarihleri, yerinden edilme, hasar veya yaralanma kanıtları, taahhüt veya sponsor yazıları ve karar.</li>
          <li><b>Ödemeler:</b> seçtiğiniz plan, girdiğiniz Whish Money veya OMT transfer referansı, tutar ve hangi tarihe kadar ödeme yaptığınız.</li>
          <li><b>Ağrı ve olaylar:</b> bir seanstan sonra hastalar ağrılarını 0’dan 10’a kadar puanlayabilir ve bir sorunu anlatabilir. Fizyoterapistiniz bunu seansla birlikte görür.</li>
        </ul>
        <p>Egzersiz planları ve sonuçları <b>sağlık verisidir</b>. Bunları yalnızca size ve fizyoterapistinize hizmet sunmak için kullanırız.</p>

        <h2>Neleri toplamıyoruz</h2>
        <ul>
          <li><b>Egzersizlerinizin video veya fotoğrafı yok.</b> Kamera görüntüsü, ekleminizin açısını ölçmek için kendi cihazınızda analiz edilir. Asla yüklenmez veya kaydedilmez. Yalnızca yukarıda sayılan sayılar gönderilir.</li>
          <li><b>İzleme yok.</b> {B.name}’da analiz, reklam veya sosyal medya izleyicisi yoktur ve çerez kullanılmaz. Bkz. <Link to="/cookies">Çerezler ve depolama</Link>.</li>
          <li>Verilerinizi satmayız ve reklam için kullanmayız.</li>
        </ul>

        <h2>Verilerinizi kimler görebilir</h2>
        <ul>
          <li><b>Fizyoterapistiniz</b>, ona bağlandığınızda: adınız, e-posta adresiniz, atanan egzersizler, en son 50 egzersiz sonucunuz (bağlanmadan önceki sonuçlar dahil) ve bunlara dayanan haftalık “ilgi gerektirenler” özeti. Fizyoterapistinizi kaldırırsanız {B.name} içindeki hiçbir verinizi artık göremez ve atanan egzersizleriniz silinir.</li>
          <li>Bir fizyoterapistin herkese açık kimliğini giren <b>hastalar</b> o fizyoterapistin adını ve kimliğini görür.</li>
          <li>Hizmeti bizim için işleten <b>hizmet sağlayıcılar</b>: Netlify (web sitesini barındırır), Render (sunucumuzu çalıştırır), özel MongoDB veritabanımız ve e-posta sağlayıcımız (şifre sıfırlama e-postalarını gönderir). Verileri yalnızca bize hizmet sunmak için kullanabilirler.</li>
          <li>Yetkili makamlar, yalnızca yasanın paylaşmamızı gerektirdiği durumlarda.</li>
          <li><b>İnceleme ekibimiz</b> fizyoterapistlerin doğrulama ve destek belgelerini yalnızca bunlar hakkında karar vermek için görür. Onayınızla bunları Fizyoterapistler Odası (OPTL) veya belgeyi düzenleyen kurumla kontrol edebilir ve onaylanan destek dosyalarının yaklaşık %10’unu her çeyrekte denetleyebiliriz.</li>
          <li><b>Giriş yapmış hastalar</b>, rehberde listelenmeyi seçen fizyoterapistlerin adını, bölgesini, kliniğini, dillerini ve doğrulanmış rozetini görür.</li>
        </ul>

        <h2>Neden kullanıyoruz (hukuki dayanak)</h2>
        <ul>
          <li>Hesap ve faturalama bilgileri: kaydolduğunuz hizmeti sunmak için.</li>
          <li>Sağlık verileri (egzersiz planları ve sonuçları): hasta hesabı oluştururken verdiğiniz açık rızanızla. Fizyoterapistinizi kaldırarak veya hesabınızı silmemizi isteyerek rızanızı istediğiniz zaman geri çekebilirsiniz. Geri çekme, önceki kullanımı etkilemez.</li>
          <li>İstek sınırlaması için IP adresi: hizmeti güvenli ve erişilebilir tutmak için.</li>
        </ul>
        <p>Elektronik işlemler ve kişisel veriler hakkındaki 2018 tarihli 81 sayılı Lübnan Kanunu’na ve Avrupa Birliği’ndeki kullanıcılar için Genel Veri Koruma Tüzüğü’ne (GDPR) uyarız.</p>

        <h2>Verileriniz nerede saklanır</h2>
        <p>Sunucularımız ve veritabanımız ülkenizin dışında olabilir. Yasanın gerektirdiği durumlarda bu aktarımlar için uygun güvenceler kullanırız.</p>

        <h2>Sesli geri bildirim</h2>
        <p>Egzersiz koçu, tarayıcınızın yerleşik metin okuma özelliğini kullanarak kısa ifadeler (“Çok iyi” gibi) söyler. Bazı tarayıcılar bunun için tarayıcı üreticisinin çevrimiçi ses hizmetini kullanır. İfadeler herkes için aynıdır ve kişisel veri içermez.</p>

        <h2>Ne kadar süre saklıyoruz</h2>
        <p>Hesabınızı ve sonuçlarınızı hesabınız açık olduğu sürece saklarız. Hesabınızı silmemizi istediğinizde, yasanın saklamamızı gerektirdiği kayıtlar (faturalar gibi) dışında, hesabı ve sonuçlarını {P.deletionDays} gün içinde sileriz.</p>
        <p>Doğrulama ve destek belgeleri, her yıl yeniden kontrol edebilmemiz ve desteği denetleyebilmemiz için hesabınız açık olduğu sürece saklanır. Bir destek dönemi sona erdiğinde, bir denetim veya anlaşmazlık gerektirmedikçe belgelerini 12 ay içinde sileriz.</p>

        <h2>Haklarınız</h2>
        <p>Hakkınızda tuttuğumuz verileri görmeyi, düzeltmeyi, silmeyi, bir kopyasını almayı veya kullanımına itiraz etmeyi ya da kullanımını kısıtlamayı isteyebilirsiniz. Hesabınızı kapatmak dahil bir talepte bulunmak için {mailto(B.privacyEmail)} adresine yazın. {P.deletionDays} gün içinde yanıt veririz. Memnun kalmazsanız, yaşadığınız yerdeki veri koruma otoritesine şikâyette bulunabilirsiniz.</p>

        <h2>Güvenlik</h2>
        <p>Şifreler yalnızca hash olarak saklanır. Uygulamada herhangi bir kişisel veriyi görmek için giriş yapmanız gerekir ve bir hastanın verilerini yalnızca o hasta ve bağlı fizyoterapisti görebilir. Ekibimiz ve hizmet sağlayıcılarımız verilere yalnızca hizmeti çalıştırmak veya onarmak gerektiğinde erişir. Hiçbir sistem tamamen güvenli değildir; bir ihlal sizi etkilerse, yasanın gerektirdiği şekilde size bildiririz.</p>

        <h2>Çocuklar</h2>
        <p>{P.adultAge} yaşından küçük hastalar {B.name}’ı yalnızca hesabı oluşturan, yöneten ve çocuk adına onayları veren bir ebeveyn veya vasinin gözetiminde kullanabilir.</p>

        <h2>Değişiklikler</h2>
        <p>Topladığımız veriler değiştiğinde bu sayfayı günceller ve en üstteki tarihi değiştiririz.</p>
      </>
    ),
  },

  terms: {
    title: 'Kullanım koşulları',
    Body: () => (
      <>
        <p>
          Bu koşullar, Lübnan merkezli {B.name}’ı kullandığınızda geçerlidir. Hesap oluşturarak bu koşulları,
          <Link to="/privacy"> Gizlilik politikasını</Link> ve fizyoterapistler ile kurumlar için
          <Link to="/pricing"> Fiyatlandırma, iptal ve iade politikasını</Link> kabul etmiş olursunuz.
        </p>

        <h2>{B.name} nedir</h2>
        <p>Bir fizyoterapistin ev egzersizleri atamasını ve hastanın bunları kamera karşısında, eklem açısı ve tekrarlar hakkında ekranda ve sesli geri bildirimle yapmasını sağlayan bir araç.</p>

        <h2>Tıbbi tavsiye değildir, acil durumlar için değildir</h2>
        <ul>
          <li>{B.name} hiçbir hastalığı teşhis veya tedavi etmez ve fizyoterapistinizin ya da doktorunuzun yerini tutmaz.</li>
          <li>Kameranın ölçtüğü açılar tahminidir. Işık, kamera konumu, kıyafet veya vücudunuzun ne kadarının göründüğü nedeniyle hatalı olabilir.</li>
          <li>Fizyoterapistinizin talimatlarına uyun. Ağrı veya yeni belirtiler hissederseniz ya da planınızda durmanızı söyleyen bir şey varsa durun ve tavsiye alın.</li>
          <li>Acil bir durumda yerel acil durum numarasını arayın.</li>
        </ul>

        <h2>Hesabınız</h2>
        <ul>
          <li>Doğru bilgi verin ve şifrenizi gizli tutun. Bir hesap tek bir kişi içindir.</li>
          <li>{P.adultAge} yaşından küçük hastalar {B.name}’ı yalnızca hesaptan sorumlu bir ebeveyn veya vasinin gözetiminde kullanabilir.</li>
        </ul>

        <h2>Fizyoterapistler ve kurumlar</h2>
        <ul>
          <li>Hastaları tedavi ettiğiniz yerde meslek icra etmeye yetkili ve nitelikli olmalısınız.</li>
          <li>Atadığınız egzersizlerden, açılardan, güvenli aralıklardan ve durma kriterlerinden ve her hastanın bunlar için klinik olarak uygun olduğunu onaylamaktan siz sorumlusunuz.</li>
          <li>Hastaların verilerini yalnızca onları tedavi etmek için kullanın ve size uygulanan sağlık verisi ve meslek kurallarına uyun.</li>
          <li>Abonelikler, iptal ve iadeler <Link to="/pricing">Fiyatlandırma, iptal ve iade politikası</Link> kapsamındadır.</li>
          <li><b>Doğrulama:</b> hastalar sizi ancak ekibimiz belgelerinizi doğruladıktan sonra bulup ekleyebilir. Belgeleri her yıl 30 günlük ek süreyle yeniden kontrol ederiz. Belgeleri sahte veya süresi dolmuş bir hesabı askıya alabiliriz.</li>
          <li><b>Uzaktan bakım:</b> {B.name} reçete ettiğiniz ev egzersizlerini destekler. Uzaktan takibin size uygulanan kurallarca izin verildiğinden emin olun; World Physiotherapy, Lübnan’da tele-sağlığın izinli olmadığını belirtir, bu nedenle uzaktan tedavi sunmadan önce yazılı görüş alın.</li>
          <li><b>Maddi desteğe</b> ekibimiz karar verir. Sahte belgeler, desteğin kaldırılması ve 12 ay boyunca yeniden başvuru yapılamaması anlamına gelir.</li>
        </ul>

        <h2>Fiyat</h2>
        <p>{B.name} hastalar için ücretsizdir. Fizyoterapistler, bizim onayladığımız Whish Money veya OMT transferiyle aylık bir plan öder. Planlar, indirimler, destekler ve iadeler <Link to="/pricing">Fiyatlandırma, iptal ve iade politikasında</Link> açıklanmıştır.</p>

        <h2>Kabul edilebilir kullanım</h2>
        <p>Hizmeti kötüye kullanmayın: başkalarının hesaplarına veya verilerine erişmeyin, hizmeti bozmaya veya aşırı yüklemeye çalışmayın ve yasa dışı hiçbir şey yapmayın.</p>

        <h2>Erişilebilirlik ve değişiklikler</h2>
        <p>{B.name}’ı çalışır durumda tutmak için çaba gösteririz, ancak her zaman erişilebilir veya hatasız olacağını vaat edemeyiz. Özellikleri değiştirebilir veya kaldırabiliriz ve bunu yaptığımızda bu koşulları güncelleriz.</p>

        <h2>Sorumluluk</h2>
        <p>Egzersizlerin veya ölçümlerin fizyoterapistinizin tavsiyesine aykırı kullanılmasından ya da kontrolümüz dışındaki olaylardan kaynaklanan kayıplardan sorumlu değiliz. Bu koşullardaki hiçbir şey, yasanın sınırlanmasına izin vermediği sorumluluğu veya tüketici olarak haklarınızı sınırlamaz.</p>

        <h2>Kullanımın sona ermesi</h2>
        <p>{B.name}’ı istediğiniz zaman kullanmayı bırakabilir ve hesabınızı silmemizi isteyebilirsiniz ({mailto(B.privacyEmail)}). Bu koşulları ihlal eden bir hesabı askıya alabiliriz.</p>

        <h2>Uygulanacak hukuk ve iletişim</h2>
        <p>Bu koşullar Lübnan kanunlarına tabidir ve anlaşmazlıklar, yaşadığınız ülkenin kanunlarından doğan haklarınız saklı kalmak kaydıyla, Lübnan’ın yetkili mahkemelerinde çözülür. Sorular: {mailto(B.email)}.</p>
      </>
    ),
  },

  pricing: {
    title: 'Fiyatlar, iptal ve iadeler',
    Body: () => (
      <>
        <p>{B.name} <b>hastalar için ücretsizdir</b>. Her fizyoterapist, aktif hasta sayısına göre aylık bir plan öder. Whish Money veya OMT transferiyle ödeme yapar ve makbuz referansını uygulamaya girersiniz; 1 iş günü içinde onaylarız.</p>

        <h2>Fiyatlar</h2>
        <table className="data-table">
          <thead><tr><th>Aynı anda bağlı hasta sayısı</th><th>Fizyoterapist başına fiyat</th></tr></thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <tr key={plan.price}><td>{planLabel(plan, i)}</td><td>Aylık {plan.price} $</td></tr>
            ))}
          </tbody>
        </table>
        <p>Fiyatlar ABD doları cinsindendir. Her taraf kendi banka veya transfer ücretlerini öder. Bir vergi uygulanıyorsa faturada gösterilir. Yazılı olarak aksi kararlaştırılmadıkça bir kurum, fizyoterapistlerinin her biri için aynı fiyatı öder.</p>

        <h2>Bölgesel indirim</h2>
        <p>Çalıştığınız yer, bölgedeki tipik klinik fiyatlarına ve ihtiyaca göre %0 (Beyrut) ile %50 (Akkar) arasında bir indirim belirler: D = min(%50, 0,5 × (1 − P / 35) + 0,3 × N), en yakın %5’e yuvarlanır; burada P, bölgedeki tipik seans fiyatı (dolar), N ise 0 ile 1 arasında bir ihtiyaç puanıdır. İş yeri belgeniz bölgeyi doğrular.</p>

        <h2>Maddi destek</h2>
        <ul>
          <li>Beş yol bölgesel indirime eklenir: kariyer başlangıcı (+%30, bir kez), gelir sıkıntısı (+%10 ile +%40), savaş veya yerinden edilme (+%20 ile +%30), toplum sağlığı taahhüdü (+%20) ve sponsorlu yerler (%100’e kadar; bir STK, Halk Sağlığı Bakanlığı, OPTL veya bir üniversite tarafından ödenir).</li>
          <li>Toplam indirim %75 ile sınırlıdır ve bir sponsor yerinizi ödemediği sürece fiyat ayda 6 $’ın altına düşmez.</li>
          <li>5 iş günü içinde karar veririz. %50’nin üzerindeki toplamlar ikinci bir inceleyici gerektirir. Destek 6 ay sürer ve yeni belgelerle yenilenir.</li>
        </ul>

        <h2>Yıllık ödeme, pilot ve öneriler</h2>
        <ul>
          <li>12 ayı peşin, 10 ay fiyatına ödeyin.</li>
          <li>Pilot fizyoterapistler ilk ayı ücretsiz, ardından 12 ay boyunca yarı fiyata kullanır.</li>
          <li>Herkese açık kimliğinizle başka bir fizyoterapisti önerin: o doğrulandığında ikiniz de bir ay ücretsiz kazanırsınız.</li>
        </ul>

        <h2>Faturalama</h2>
        <ul>
          <li>Aboneliğinizin başladığı günden itibaren her ay peşin olarak faturalandırılırsınız.</li>
          <li>Planınız, size aynı anda kaç hastanın bağlı olduğuna bağlıdır. Planınızın sınırını aşarsanız, bir sonraki fatura ayınızdan itibaren bir üst plana geçmenizi isteriz. Geçmiş aylar için asla ücret almayız.</li>
          <li>Daha büyük bir plana geçiş hemen geçerli olur; yeni fiyat bir sonraki fatura ayınızdan başlar. Daha küçük bir plana geçiş, hastalarınız o plana sığdığı sürece bir sonraki fatura ayınızdan itibaren geçerli olur.</li>
          <li>Planınızın izin verdiğinden fazla hasta bağlayamazsınız; önce Plan ve faturalama bölümünden daha büyük bir plan seçin.</li>
        </ul>

        <h2>İptal</h2>
        <ul>
          <li>{mailto(B.email)} adresine e-posta göndererek istediğiniz zaman iptal edebilirsiniz. Asgari süre veya iptal ücreti yoktur.</li>
          <li>İptal, ödemesini yaptığınız ayın sonunda geçerli olur. O zamana kadar tam erişiminiz devam eder ve sizden tekrar ücret alınmaz.</li>
          <li>Bundan sonra, yeniden abone olana kadar yeni hasta bağlayamayacağınız veya egzersiz atayamayacağınız şekilde hesabınızı kısıtlayabiliriz. Hastalarınız ücretsiz hesaplarını ve kendi sonuçlarını korur.</li>
        </ul>

        <h2>İadeler</h2>
        <ul>
          <li><b>İlk ödeme garantisi:</b> {B.name}’da yeniyseniz, ödemeden sonraki {P.moneyBackDays} gün içinde isteyerek ilk ödemenizin tamamını geri alabilirsiniz.</li>
          <li><b>Her zaman iade edilir:</b> mükerrer ödemeler, faturalama hataları ve iptaliniz geçerli olduktan sonra yapılan her türlü tahsilat.</li>
          <li><b>Uzun kesintiler:</b> {B.name}, bizden kaynaklanan bir sorun nedeniyle {P.outageHours} saatten uzun süre kesintisiz erişilemez olursa, isterseniz o günleri orantılı olarak iade eder veya hesabınıza alacak olarak yazarız.</li>
          <li><b>Hizmeti sonlandırırsak</b> veya siz <Link to="/terms">Koşulları</Link> ihlal etmeden hesabınızı kapatırsak, ödediğiniz ayın kullanılmayan kısmını iade ederiz.</li>
          <li>Diğer durumlarda, ay ortasında iptal etseniz bile başlamış aylar iade edilmez.</li>
          <li>Koşulları ihlal ettiği için kapatılan hesaplara içinde bulunulan ay için iade yapılmaz.</li>
        </ul>

        <h2>İade nasıl istenir</h2>
        <p>Ödemeden sonraki {P.refundRequestDays} gün içinde adınızı ve ödeme tarihini belirterek {mailto(B.email)} adresine yazın. {P.refundReplyDays} iş günü içinde yanıt verir, onaylanan iadeleri mümkünse ödeme yaptığınız yöntemle {P.refundPayDays} gün içinde öderiz.</p>

        <h2>Geciken ödeme</h2>
        <p>Bir fatura vade tarihinden sonraki {P.latePaymentDays} gün içinde ödenmezse, ödenene kadar hesabınızı yalnızca görüntülemeyle sınırlayabiliriz. Geciken bir ödeme nedeniyle hastaların verilerini asla silmeyiz.</p>

        <h2>Fiyat değişiklikleri</h2>
        <p>Bir fiyat değişikliğinden en az {P.priceNoticeDays} gün önce size e-posta göndeririz. Yeni fiyat, bildirimden sonraki ilk fatura ayınızdan itibaren uygulanır ve o tarihten önce iptal edebilirsiniz.</p>

        <h2>Yasal haklarınız</h2>
        <p>Bu politikadaki hiçbir şey, size uygulanan tüketici koruma kanunları kapsamındaki haklarınızı sınırlamaz.</p>
      </>
    ),
  },

  cookies: {
    title: 'Çerezler ve depolama',
    Body: () => (
      <>
        <p>{B.name} <b>çerez kullanmaz</b> ve analiz, reklam veya üçüncü taraf izleyici kullanmaz. Yalnızca kullandığınız özelliklerin çalışması için tarayıcınızın yerel depolama alanına birkaç öğe kaydeder:</p>
        <table className="data-table">
          <thead><tr><th>Öğe</th><th>Ne işe yarar</th><th>Ne zaman silinir</th></tr></thead>
          <tbody>
            <tr><td><code>authToken</code></td><td>Oturumunuzu açık tutar</td><td>Çıkış yaptığınızda veya oturumun süresi dolduğunda</td></tr>
            <tr><td><code>pendingSessions</code></td><td>Çevrimdışıyken kaydedilen egzersiz sonuçları, daha sonra gönderilebilmeleri için</td><td>Gönderilir gönderilmez</td></tr>
            <tr><td><code>appLanguage</code></td><td>Uygulama için seçtiğiniz dil</td><td>Tarayıcı verilerinizi temizlediğinizde</td></tr>
            <tr><td><code>coachLanguage</code></td><td>Seçtiğiniz koç dili</td><td>Tarayıcı verilerinizi temizlediğinizde</td></tr>
            <tr><td><code>storageNoticeSeen</code></td><td>Depolama bildirimini kapattığınızı hatırlar</td><td>Tarayıcı verilerinizi temizlediğinizde</td></tr>
          </tbody>
        </table>
        <p>Bu öğeler istediğiniz hizmet için kesinlikle gereklidir, bu nedenle kullanımları için onay istemeyiz. İsteğe bağlı çerez veya analiz eklersek, önce onayınızı isteriz ve reddedebilirsiniz.</p>
        <p>Bu öğeleri istediğiniz zaman tarayıcı ayarlarından silebilirsiniz (bu site için: site verilerini temizle). Bu durumda oturumunuz kapanır ve henüz gönderilmemiş sonuçlar kaybolur.</p>
      </>
    ),
  },

  accessibility: {
    title: 'Erişilebilirlik',
    Body: () => (
      <>
        <p>Ağrısı olanlar, yaşlılar ve engelliler dahil herkesin {B.name}’ı kullanabilmesini istiyoruz. Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.2’nin AA düzeyini karşılamayı hedefliyoruz.</p>
        <h2>Neler yaptık</h2>
        <ul>
          <li>Büyük varsayılan metin (18 px), yüksek kontrastlı renkler ve en az 44 piksel yüksekliğinde düğmeler.</li>
          <li>Her şey klavyeyle kullanılabilir ve odak çerçevesi açıkça görünür.</li>
          <li>Form alanlarının görünür etiketleri vardır ve hatalar yalnızca renkle değil, sözcüklerle de açıklanır.</li>
          <li>Egzersiz koçu geri bildirimlerini sesli verir, böylece ekrana bakmanız gerekmez.</li>
          <li>Cihazınız hareketi azaltacak şekilde ayarlanmışsa animasyonlar azaltılır.</li>
          <li>Uygulama, egzersiz koçu ve bu politikalar sekiz dilde mevcuttur: Arapça (sağdan sola), Batı Ermenicesi, İngilizce, Fransızca, İspanyolca, Almanca, İtalyanca ve Türkçe.</li>
        </ul>
        <h2>Bilinen sınırlamalar</h2>
        <ul>
          <li>Egzersiz koçunun açıları ölçebilmesi için bir kamera ve vücudunuzun yeterli bir kısmının görüntüde olması gerekir.</li>
          <li>Sunucudan gelen ve yalnızca uygulamanın içinde bir şeyler ters gittiğinde görünen birkaç nadir teknik mesaj yalnızca İngilizcedir.</li>
          <li>Site henüz bağımsız bir erişilebilirlik uzmanı tarafından denetlenmedi.</li>
        </ul>
        <h2>Bize bir sorun bildirin</h2>
        <p>Bir şeyi kullanmak zorsa, {mailto(B.email)} adresine hangi sayfada ne olduğunu yazın. Yanıt verir ve bir çözüm üzerinde çalışırız.</p>
      </>
    ),
  },
}
