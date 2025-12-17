import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Форма отправлена:", formData);
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", message: "" });
  };

  const services = [
    { icon: "Sofa", title: "Перетяжка диванов", description: "Полная замена обивки с восстановлением конструкции" },
    { icon: "Armchair", title: "Перетяжка кресел", description: "Реставрация офисной и домашней мебели" },
    { icon: "TableProperties", title: "Перетяжка стульев", description: "Обновление кухонных и столовых стульев" },
    { icon: "BedDouble", title: "Изголовья кроватей", description: "Создание и обивка изголовий на заказ" },
    { icon: "Box", title: "Банкетки и пуфы", description: "Перетяжка мягкой мебели любой сложности" },
    { icon: "Package", title: "Замена наполнителя", description: "Современные материалы для комфорта" }
  ];

  const portfolio = [
    { 
      before: "https://cdn.poehali.dev/projects/1191f786-d6c2-4d1c-93ce-0b556b403a01/files/49733794-4605-419e-ab42-622c2916cc59.jpg", 
      after: "https://cdn.poehali.dev/projects/1191f786-d6c2-4d1c-93ce-0b556b403a01/files/3218398e-25bb-4e70-9cde-b283469b8987.jpg", 
      title: "Диван классический" 
    },
    { before: "/placeholder.svg", after: "/placeholder.svg", title: "Кресло офисное" },
    { before: "/placeholder.svg", after: "/placeholder.svg", title: "Стулья кухонные" }
  ];

  const process = [
    { step: "01", title: "Консультация", description: "Бесплатный выезд мастера для оценки работ" },
    { step: "02", title: "Выбор материала", description: "Помощь в подборе ткани из каталога" },
    { step: "03", title: "Изготовление", description: "Работа в мастерской 7-14 дней" },
    { step: "04", title: "Доставка", description: "Привозим и устанавливаем готовую мебель" }
  ];

  const reviews = [
    { name: "Елена Петрова", text: "Отличная работа! Диван выглядит как новый. Мастера работали аккуратно и быстро.", rating: 5 },
    { name: "Дмитрий Соколов", text: "Перетянули 6 стульев для столовой. Результат превзошел ожидания. Рекомендую!", rating: 5 },
    { name: "Марина Иванова", text: "Профессиональный подход и качественные материалы. Обратимся еще!", rating: 5 }
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Sofa" size={32} className="text-accent" />
            <span className="text-2xl font-bold text-primary">Перетяжка Мебели</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-foreground hover:text-accent transition">Услуги</a>
            <a href="#portfolio" className="text-foreground hover:text-accent transition">Портфолио</a>
            <a href="#process" className="text-foreground hover:text-accent transition">Процесс</a>
            <a href="#reviews" className="text-foreground hover:text-accent transition">Отзывы</a>
            <a href="#contact" className="text-foreground hover:text-accent transition">Контакты</a>
          </nav>
          <a href="tel:+79001234567" className="flex items-center gap-2 font-semibold text-primary">
            <Icon name="Phone" size={20} />
            <span className="hidden md:inline">+7 (900) 123-45-67</span>
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Профессиональная перетяжка мебели в Новороссийске
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Вернем вашей мебели первоначальный вид. Опыт работы более 15 лет. Гарантия качества 2 года.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8" asChild>
                <a href="#contact">Бесплатная консультация</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 border-white text-lg px-8" asChild>
                <a href="#portfolio">Посмотреть работы</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выполняем полный спектр работ по реставрации и перетяжке мягкой мебели
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Портфолио работ</h2>
            <p className="text-muted-foreground text-lg">
              До и после — результаты наших работ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={item.before} alt="До" className="w-full h-48 object-cover" />
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                        ДО
                      </div>
                    </div>
                    <div className="relative">
                      <img src={item.after} alt="После" className="w-full h-48 object-cover" />
                      <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded text-sm font-medium">
                        ПОСЛЕ
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Как мы работаем</h2>
            <p className="text-muted-foreground text-lg">
              Простой и понятный процесс от заявки до результата
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-6xl font-bold text-accent/20 mb-4">{item.step}</div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {index < process.length - 1 && (
                  <Icon 
                    name="ArrowRight" 
                    className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-accent" 
                    size={24}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">
              Нам доверяют жители Новороссийска
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <div className="font-semibold text-primary">{review.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Запишитесь на консультацию</h2>
              <p className="text-xl text-white/90">
                Оставьте заявку, и наш мастер свяжется с вами в течение 15 минут
              </p>
            </div>
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ваше имя
                    </label>
                    <Input
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Телефон
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="+7 (900) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Описание работы (необязательно)
                    </label>
                    <Textarea
                      placeholder="Опишите, какую мебель нужно перетянуть..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white text-lg">
                    Получить консультацию
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sofa" size={28} className="text-accent" />
                <span className="text-xl font-bold text-primary">Перетяжка Мебели</span>
              </div>
              <p className="text-muted-foreground">
                Профессиональная реставрация и перетяжка мебели в Новороссийске с 2009 года
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary">Контакты</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>+7 (900) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@mebel-nvrsk.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>г. Новороссийск, ул. Советов, 50</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary">График работы</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Пн-Пт: 9:00 - 19:00</p>
                <p>Сб: 10:00 - 16:00</p>
                <p>Вс: Выходной</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Перетяжка Мебели Новороссийск. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;