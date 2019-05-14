FROM node:10 as builder

COPY sources/package.json sources/yarn.lock /sources/

RUN cd /sources && yarn install

COPY sources /sources

ARG VERSION=unknown
ENV VERSION ${VERSION}

RUN cd /sources && \
    yarn version --no-git-tag-version --new-version $VERSION && \
    echo -e "Starting \"yarn build\" \n" && \
    yarn build

FROM nginx:1.14

ENV ENV=development

#RUN rm /etc/nginx/conf.d/00_default.conf
COPY docker/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /sources/build /usr/share/nginx/html

COPY docker/config /opt/config
COPY docker/scripts/run_application.sh /opt/run_application.sh
RUN chmod +x /opt/run_application.sh

CMD [ "/opt/run_application.sh" ]
