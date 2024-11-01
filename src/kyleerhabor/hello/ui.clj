(ns kyleerhabor.hello.ui
  (:require
   [kyleerhabor.hello.core :as-alias core]
   [kyleerhabor.hello.config :refer [config]]
   [kyleerhabor.hello.ui.icon :as icon]
   [garden.core :refer [css]]
   [garden.selectors :as s]
   [garden.stylesheet :refer [at-media]]
   [hiccup2.core :as h]))

(def scaffold
  [:html {:lang "en-US"}
   [:head
    [:meta {:charset "UTF-8"}]
    [:meta {:name "viewport"
            :content "width=device-width, initial-scale=1"}]]])

;;; CSS

(defn vari [s]
  (str "var(" s ")"))

(def default-css-flags {:pretty-print? (::core/debug? config)})

(def default-css-rules
  [[(s/root) {:--link-color (::link-color-light config)}]
   (at-media {:prefers-color-scheme "dark"}
     [(s/root) {:--link-color (::link-color-dark config)
                :--background-color (::background-color-dark config)}])
   [:* {:margin "0"
        :padding "0"
        :font "inherit"}]
   [:html {:background-color (vari "--background-color")
           :color-scheme "light dark"
           :line-height "1.5"}]
   [:body {:box-sizing "border-box"
           ;; TODO: Find a better font.
           :font-family ["\"Helvetica Neue\"" "\"Helvetica\"" "\"Arial\"" "sans-serif"]}]
   [:a {:color (vari "--link-color")}]])

(def flex {:display "flex"})

(def no-list-style-type {:list-style-type "none"})

(def home
  [:html
   [:head
    [:title (::title config)]
    [:style
     (h/raw
       (css default-css-flags
         (conj default-css-rules
           [:body {:display "grid"
                   :font-size "1.1em"
                   :gap "0.75em"
                   :margin-block-start "40vh"
                   :margin-inline "4vw"}]
           [:header {:grid-row "1"
                     :grid-column "2"}]
           [:main {:grid-row "1"
                   :grid-column "1"}]
           [:footer {:grid-row "2"
                     :grid-column "1"}]
           [:h1 {:margin-block-end "0.25em"
                 :font-size "1.2em"
                 :font-weight "bold"}]
           [:p {:margin-block-end "0.25em"}]
           [:#navigation (merge flex no-list-style-type
                           {:font-size "1.075em"
                            :font-variant-caps "all-small-caps"
                            :font-weight "550"
                            :gap "0.35em"})]
           [:#contacts (merge flex no-list-style-type
                         {:padding-inline-start "0"
                          :column-gap "0.375rem"})
            [:a {:color "inherit"}]])))]]
   [:body
    [:header
     [:nav
      [:ul {:id "navigation"}]]]
    [:main
     [:h1
      "Hello!"]
     [:p
      "I'm "
      [:b "Kyle Erhabor"]
      ", a software developer known online as "
      [:b "Klay"]
      "."]]
    [:footer
     [:address
      [:ul {:id "contacts"}
       [:li
        [:a {:href (str "mailto:" (::email config))
             :title "Email"}
         icon/mail]]
       [:li
        [:a {:href (::github config)
             :target "_blank"
             :title "GitHub"}
         icon/github]]]]]]])

;; NOTE: I had an implementation for a writings (articles/blog/etc.) page, but decided to remove it, since just having a
;; home page is enough.
