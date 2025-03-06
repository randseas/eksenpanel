import { useNavigate } from "react-router";
import Header from "../components/common/header";
import checkLogin from "../helpers/authHelper";
import config from "../config";

export default function Home() {
  const navigate = useNavigate();
  const isLogin = checkLogin();
  return (
    <div>
      <Header />
      <div className="flex overflow-x-hidden mt-[60px] h-full flex-col items-start justify-start text-start">
        <section
          id="main"
          className="flex px-3.5 lg:px-[60px] xl:px-[120px] h-full mb-24 xl:my-3 xl:min-h-[88vh] flex-col-reverse lg:flex-row items-center justify-center text-center xl:text-start xl:justify-between w-full"
        >
          <div className="mt-[-50px]">
            <h1 className="font-[550] dark:text-white text-black text-[38px] leading-[48px]">
              <span className="blue-green-cyan">Eksen Panel</span>
              <br />
              <span className="magenta-orange-pink">Tumblr Hizmetleri</span>
            </h1>
            <p className="max-w-[500px] font-[450] text-lg mt-1.5 text-zinc-800 dark:text-zinc-100 w-full break-words">
              Eksen Panel'in Tumblr hizmetleri ile blogunuzu kendi sitenize
              yönlendirin. Daha fazla ziyaretçi çekin, markanızı güçlendirin ve
              SEO'da öne çıkın!
            </p>
            <div className="relative mt-4 inline-flex items-center justify-center gap-4 group">
              <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              {isLogin ? (
                <a
                  role="button"
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                  onClick={() => navigate("/dashboard")}
                >
                  Panele Git
                  <svg
                    viewBox="0 0 10 10"
                    height="10"
                    width="13"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h9"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[4px]"
                    ></path>
                  </svg>
                </a>
              ) : (
                <a
                  role="button"
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                  onClick={() => navigate("/auth/register")}
                >
                  Hemen başla!
                  <svg
                    viewBox="0 0 10 10"
                    height="10"
                    width="13"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h9"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[4px]"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div className="relative">
            <img
              draggable="false"
              className="mb-5 w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px] z-[77777]"
              src="https://api.eksenpanel.com/uploads/logo.png"
            />
            <div
              draggable="false"
              className="rgb left-[14%] top-[14%] h-[200px] w-[200px] lg:h-[300px] opacity-30 rounded-full lg:w-[300px] z-[-1] absolute blur-3xl"
            ></div>
          </div>
        </section>
        <section
          id="specifications"
          className="flex px-3.5 lg:px-[60px] xl:px-[120px] h-full min-h-[59vh] border-t border-zinc-200 dark:border-zinc-800 flex-col items-center justify-center w-full"
        >
          <h1 className="font-[550] mt-6 dark:text-white text-zinc-950 text-3xl">
            Özellikler
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1040px] gap-2 mt-6 grid-rows-1">
            <div className="bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex flex-col items-start justify-start rounded-2xl p-5">
              <div className="bg-zinc-200/50 dark:bg-zinc-700 flex items-center justify-center rounded-xl w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-700 dark:text-zinc-50"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <a className="tracking-[-0.010em] text-[18px] font-medium mt-3">
                Blog Yönlendirme
              </a>
              <p className="mt-1.5 text-zinc-800/90 dark:text-zinc-50">
                Tumblr blogunuzu özel alan adınıza yönlendirerek markanızı
                güçlendirin. SEO uyumlu başlık ve açıklamalar ile arama
                motorlarında daha görünür olun.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex flex-col items-start justify-start rounded-2xl p-5">
              <div className="bg-zinc-200/50 dark:bg-zinc-700 flex items-center justify-center rounded-xl w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-700 dark:text-zinc-50"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <a className="tracking-[-0.010em] text-[18px] font-medium mt-3">
                Takipçili Tumblr Hesapları
              </a>
              <p className="mt-1.5 text-zinc-800/90 dark:text-zinc-50">
                Yüksek takipçili Tumblr hesapları ile erişiminizi genişletin,
                markanızı daha fazla kişiye ulaştırarak etkili bir dijital
                varlık oluşturun.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex flex-col items-start justify-start rounded-2xl p-5">
              <div className="bg-zinc-200/50 dark:bg-zinc-700 flex items-center justify-center rounded-xl w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-700 dark:text-zinc-50"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </div>
              <a className="tracking-[-0.010em] text-[18px] font-medium mt-3">
                Anında Kurulum
              </a>
              <p className="mt-1.5 text-zinc-800/90 dark:text-zinc-50">
                Tumblr yönlendirme ve hesap hizmetlerimiz hızlı ve sorunsuz bir
                şekilde gerçekleştirilir. Beklemeye gerek kalmadan anında
                kullanıma hazır olun.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex flex-col items-start justify-start rounded-2xl p-5">
              <div className="bg-zinc-200/50 dark:bg-zinc-700 flex items-center justify-center rounded-xl w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-700 dark:text-zinc-50"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <a className="tracking-[-0.010em] text-[18px] font-medium mt-3">
                Güvenli Hizmet
              </a>
              <p className="mt-1.5 text-zinc-800/90 dark:text-zinc-50">
                Gelişmiş güvenlik önlemleri sayesinde hesaplarınız ve
                yönlendirmeleriniz her zaman güvende. Güvenilir altyapımız ile
                içiniz rahat olsun.
              </p>
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="flex flex-col mt-6 lg:mt-4 items-center justify-center w-full px-3.5 lg:px-[60px] xl:px-[120px] mb-14"
        >
          <div className="max-w-[1040px] w-full">
            <h2 className="text-3xl font-semibold dark:text-white text-black mb-6">
              Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-4">
              <details className="bg-zinc-50 dark:bg-zinc-800/80 border dark:border-zinc-700 border-zinc-200 p-4 rounded-2xl">
                <summary className="font-medium text-zinc-900 dark:text-white text-lg cursor-pointer">
                  Tumblr blogumu nasıl yönlendirebilirim?
                </summary>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Tumblr blogunuzu özel alan adınıza yönlendirmek için panelden
                  üyelik satın alın ve yönlendirmeyi ekleyin. Kurulum süreci
                  anında tamamlanır.
                </p>
              </details>
              <details className="bg-zinc-50 dark:bg-zinc-800/80 border dark:border-zinc-700 border-zinc-200 p-4 rounded-2xl">
                <summary className="font-medium text-zinc-900 dark:text-white text-lg cursor-pointer">
                  Takipçili Tumblr hesapları nasıl çalışır?
                </summary>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Yüksek takipçili Tumblr hesapları ile erişiminizi
                  artırabilirsiniz. Satın aldığınız hesaplar size özel olarak
                  teslim edilir.
                </p>
              </details>
              <details className="bg-zinc-50 dark:bg-zinc-800/80 border dark:border-zinc-700 border-zinc-200 p-4 rounded-2xl">
                <summary className="font-medium text-zinc-900 dark:text-white text-lg cursor-pointer">
                  Hizmetleriniz güvenli mi?
                </summary>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Evet, tüm yönlendirme ve hesap hizmetlerimiz güvenli sunucular
                  üzerinden sağlanır ve müşteri gizliliğine önem verilir.
                </p>
              </details>
              <details className="bg-zinc-50 dark:bg-zinc-800/80 border dark:border-zinc-700 border-zinc-200 p-4 rounded-2xl">
                <summary className="font-medium text-zinc-900 dark:text-white text-lg cursor-pointer">
                  Ödeme yöntemleri nelerdir?
                </summary>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Kripto para ile ödeme seçeneğimiz mevcuttur.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-gray-300 py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Eksen Medya. Tüm hakları saklıdır.</p>
      </footer>
      <a
        href={config.WHATSAPP_LINK}
        target="_blank"
        className="anchor whatsapp-btn hover:scale-[1.025] transition-all ease-linear duration-100 active:scale-[1.01]"
      >
        <svg
          width={32}
          height={32}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
      <a
        href={config.TELEGRAM_LINK}
        target="_blank"
        className="anchor telegram-btn hover:scale-[1.025] transition-all ease-linear duration-100 active:scale-[1.01]"
      >
        <svg
          width={32}
          height={32}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
        </svg>
      </a>
    </div>
  );
}
