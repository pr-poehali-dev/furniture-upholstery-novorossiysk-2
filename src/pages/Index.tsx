import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const [counters, setCounters] = useState({ projects: 0, years: 0, clients: 0 });
  const [hasCounterStarted, setHasCounterStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  
  const [calculator, setCalculator] = useState({
    furnitureType: "",
    material: "",
    size: ""
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ before: string; after: string; title: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const furnitureTypes = [
    { value: "sofa", label: "Диван", basePrice: 15000 },
    { value: "armchair", label: "Кресло", basePrice: 8000 },
    { value: "chair", label: "Стул", basePrice: 3000 },
    { value: "ottoman", label: "Пуф", basePrice: 4000 },
    { value: "corner-sofa", label: "Угловой диван", basePrice: 25000 }
  ];

  const materials = [
    { value: "fabric", label: "Ткань", multiplier: 1 },
    { value: "leather", label: "Экокожа", multiplier: 1.3 },
    { value: "genuine-leather", label: "Натуральная кожа", multiplier: 2 },
    { value: "velvet", label: "Велюр", multiplier: 1.4 }
  ];

  const sizes = [
    { value: "small", label: "Маленький", multiplier: 0.8 },
    { value: "medium", label: "Средний", multiplier: 1 },
    { value: "large", label: "Большой", multiplier: 1.3 }
  ];

  useEffect(() => {
    if (calculator.furnitureType && calculator.material && calculator.size) {
      const furniture = furnitureTypes.find(f => f.value === calculator.furnitureType);
      const material = materials.find(m => m.value === calculator.material);
      const size = sizes.find(s => s.value === calculator.size);
      
      if (furniture && material && size) {
        const price = Math.round(furniture.basePrice * material.multiplier * size.multiplier);
        setEstimatedPrice(price);
      }
    } else {
      setEstimatedPrice(null);
    }
  }, [calculator]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounterStarted) {
            setHasCounterStarted(true);
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            
            const targets = { projects: 500, years: 15, clients: 350 };
            let currentStep = 0;

            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              
              setCounters({
                projects: Math.floor(targets.projects * progress),
                years: Math.floor(targets.years * progress),
                clients: Math.floor(targets.clients * progress)
              });

              if (currentStep >= steps) {
                setCounters(targets);
                clearInterval(interval);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => statsObserver.disconnect();
  }, [hasCounterStarted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const phoneRegex = /^[\d\s\(\)\+\-]+$/;
    if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный номер телефона",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Заявка отправлена!",
        description: "Наш мастер свяжется с вами в течение 15 минут",
      });
      
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или позвоните нам напрямую",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex items-center gap-3">
            <a href="tel:+79001234567" className="flex items-center gap-2 font-semibold text-primary">
              <Icon name="Phone" size={20} />
              <span className="hidden md:inline">+7 (900) 123-45-67</span>
            </a>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <a 
                    href="#services" 
                    className="text-lg font-medium text-foreground hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Услуги
                  </a>
                  <a 
                    href="#portfolio" 
                    className="text-lg font-medium text-foreground hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Портфолио
                  </a>
                  <a 
                    href="#process" 
                    className="text-lg font-medium text-foreground hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Процесс
                  </a>
                  <a 
                    href="#reviews" 
                    className="text-lg font-medium text-foreground hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Отзывы
                  </a>
                  <a 
                    href="#contact" 
                    className="text-lg font-medium text-foreground hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Контакты
                  </a>
                  <Button asChild className="mt-4 bg-accent hover:bg-accent/90">
                    <a href="tel:+79001234567" onClick={() => setMobileMenuOpen(false)}>
                      <Icon name="Phone" size={18} className="mr-2" />
                      Позвонить
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-24 animate-fade-in">
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

      <section ref={statsRef} className="py-16 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{counters.projects}+</div>
              <p className="text-lg text-muted-foreground">Выполненных проектов</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{counters.years}</div>
              <p className="text-lg text-muted-foreground">Лет опыта</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{counters.clients}+</div>
              <p className="text-lg text-muted-foreground">Довольных клиентов</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground text-lg">
              Гарантируем качество и профессиональный подход
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-accent">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Гарантия 2 года</h3>
                <p className="text-muted-foreground text-sm">
                  На все виды работ и используемые материалы
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-accent">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Home" size={32} className="text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Выезд на дом</h3>
                <p className="text-muted-foreground text-sm">
                  Бесплатный выезд мастера для замера и оценки
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-accent">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Palette" size={32} className="text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Каталог 500+ тканей</h3>
                <p className="text-muted-foreground text-sm">
                  Огромный выбор материалов на любой вкус и бюджет
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-accent">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">Сроки 7-14 дней</h3>
                <p className="text-muted-foreground text-sm">
                  Быстрое выполнение работ без потери качества
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Специальное предложение</h3>
                <p className="text-xl mb-6 text-white/90">
                  Скидка 15% на перетяжку при заказе от 2-х предметов мебели
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Icon name="Check" size={24} className="text-white flex-shrink-0" />
                    <span>Бесплатная консультация дизайнера</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="Check" size={24} className="text-white flex-shrink-0" />
                    <span>Бесплатная доставка по Новороссийску</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="Check" size={24} className="text-white flex-shrink-0" />
                    <span>Подарок — защитное средство для ткани</span>
                  </li>
                </ul>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8" asChild>
                  <a href="#contact">Получить скидку</a>
                </Button>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-6xl font-bold">-15%</div>
                      <div className="text-lg">на заказ</div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Icon name="Gift" size={40} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="services" 
        ref={(el) => (sectionsRef.current['services'] = el)}
        className={`py-20 bg-secondary/30 transition-all duration-700 ${
          visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
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

      <section 
        id="portfolio" 
        ref={(el) => (sectionsRef.current['portfolio'] = el)}
        className={`py-20 transition-all duration-700 ${
          visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Портфолио работ</h2>
            <p className="text-muted-foreground text-lg">
              До и после — результаты наших работ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-300">
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
                      <div className="p-4 flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <Icon name="ZoomIn" size={20} className="text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full p-0">
                  <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                      <div className="relative">
                        <img 
                          src={item.before} 
                          alt="До" 
                          className="w-full h-auto object-cover rounded-lg" 
                        />
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded text-lg font-medium">
                          ДО
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={item.after} 
                          alt="После" 
                          className="w-full h-auto object-cover rounded-lg" 
                        />
                        <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded text-lg font-medium">
                          ПОСЛЕ
                        </div>
                      </div>
                    </div>
                    <div className="p-6 border-t">
                      <h3 className="text-2xl font-bold text-primary text-center">{item.title}</h3>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="process" 
        ref={(el) => (sectionsRef.current['process'] = el)}
        className={`py-20 bg-secondary/30 transition-all duration-700 ${
          visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
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

      <section 
        id="reviews" 
        ref={(el) => (sectionsRef.current['reviews'] = el)}
        className={`py-20 transition-all duration-700 ${
          visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
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

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Калькулятор стоимости</h2>
              <p className="text-muted-foreground text-lg">
                Рассчитайте примерную стоимость перетяжки вашей мебели
              </p>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Тип мебели</label>
                    <Select 
                      value={calculator.furnitureType} 
                      onValueChange={(value) => setCalculator({...calculator, furnitureType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип мебели" />
                      </SelectTrigger>
                      <SelectContent>
                        {furnitureTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Материал</label>
                    <Select 
                      value={calculator.material} 
                      onValueChange={(value) => setCalculator({...calculator, material: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите материал" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material.value} value={material.value}>
                            {material.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Размер</label>
                    <Select 
                      value={calculator.size} 
                      onValueChange={(value) => setCalculator({...calculator, size: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {estimatedPrice && (
                    <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Примерная стоимость</p>
                        <p className="text-4xl font-bold text-primary">
                          {estimatedPrice.toLocaleString('ru-RU')} ₽
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Точная цена определяется после осмотра
                        </p>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-white text-lg py-6"
                    asChild
                  >
                    <a href="#contact">Записаться на бесплатный замер</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section 
        id="contact" 
        ref={(el) => (sectionsRef.current['contact'] = el)}
        className={`py-20 bg-primary text-white transition-all duration-700 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
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
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90 text-white text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      "Получить консультацию"
                    )}
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

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Как нас найти</h2>
            <p className="text-muted-foreground text-lg">
              Приезжайте к нам в мастерскую или вызовите мастера на дом
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-primary">Адрес мастерской</h3>
                      <p className="text-muted-foreground">
                        г. Новороссийск, ул. Советов, 50<br />
                        (вход со двора, 2 этаж)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-primary">Телефон</h3>
                      <a href="tel:+79001234567" className="text-accent hover:underline text-lg font-semibold">
                        +7 (900) 123-45-67
                      </a>
                      <p className="text-muted-foreground text-sm mt-1">
                        Звоните ежедневно с 9:00 до 19:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-primary">Email</h3>
                      <a href="mailto:info@mebel-nvrsk.ru" className="text-accent hover:underline">
                        info@mebel-nvrsk.ru
                      </a>
                      <p className="text-muted-foreground text-sm mt-1">
                        Ответим в течение 1 часа
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-primary">Режим работы</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Пн-Пт: 9:00 - 19:00</p>
                        <p>Сб: 10:00 - 16:00</p>
                        <p>Вс: Выходной</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.771357%2C44.723888&z=16&l=map&pt=37.771357,44.723888,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                title="Карта расположения"
              ></iframe>
            </div>
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

      <a
        href="https://wa.me/79001234567?text=Здравствуйте!%20Хочу%20узнать%20о%20перетяжке%20мебели"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>
    </div>
  );
};

export default Index;