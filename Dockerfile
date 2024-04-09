FROM --platform=linux/amd64 php:8.2-fpm as laravel-nginx

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    nginx \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    supervisor \
    gnupg2 \
    lsb-release

RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install gd
RUN docker-php-ext-install xml

RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN apt-get update
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs
RUN npm install -g yarn

RUN apt-get install -y chromium \
    gconf-service  \
    libasound2  \
    libatk1.0-0  \
    libc6  \
    libcairo2  \
    libcups2  \
    libdbus-1-3  \
    libexpat1  \
    libfontconfig1  \
    libgcc1  \
    libgconf-2-4  \
    libgdk-pixbuf2.0-0  \
    libglib2.0-0  \
    libgtk-3-0  \
    libnspr4  \
    libpango-1.0-0  \
    libpangocairo-1.0-0  \
    libstdc++6  \
    libx11-6  \
    libx11-xcb1  \
    libxcb1  \
    libxcomposite1  \
    libxcursor1  \
    libxdamage1  \
    libxext6  \
    libxfixes3  \
    libxi6  \
    libxrandr2  \
    libxrender1  \
    libxss1  \
    libxtst6  \
    ca-certificates  \
    fonts-liberation  \
    libappindicator1  \
    libnss3  \
    lsb-release  \
    xdg-utils  \
    libglfw3-dev \
    libgles2-mesa-dev \
    wget

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

RUN rm -rf node_modules

RUN composer install
RUN npm install
RUN npm run build

RUN chown -R www-data:www-data /var/www/

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker/templates/app.seuddin.com.br.conf.template /etc/nginx/sites-available/default
COPY php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
