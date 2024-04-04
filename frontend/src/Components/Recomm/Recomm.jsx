import React from "react";
import styles from "./Recomm.module.css";
import { FaGreaterThan } from "react-icons/fa6";
import img1 from "../../assets/civil.png";
import img2 from "../../assets/Eng-phy.png";
import img3 from "../../assets/phy.png";
import img4 from "../../assets/basic_civil.png";
import img5 from "../../assets/phy_notebook.png";
import img6 from "../../assets/compass.png";
import img7 from "../../assets/coat.png";
import img8 from "../../assets/chem_notebook.png";
import img9 from "../../assets/dbms.png";
import RightNav from "../RightNav/RightNav";

const Recomm = () => {
  return (
    <div>
      <div className={styles.bottomrow}>
        <div className={styles.leftcol}>
          <div className={styles.reccom_maincont}>
            <div className={styles.books_recomm}>
              <div className={styles.books_head}>
                <div className={styles.recommend}>Recommend</div>
                <div className={styles.btn_more}>
                  <div className={styles.btn_moretxt}>More</div>
                  <FaGreaterThan className={styles.greaterthan_icon} />
                </div>
              </div>
              <div className={styles.books_list}>
                <div className={styles.book}>
                  <img src={img1} className={styles.book_img}></img>
                  <div>
                    <div className={styles.book_name}>Basic Mechanical E..</div>
                    <div className={styles.book_subhead}>J. Benjamin</div>
                  </div>
                </div>
                <div className={styles.book}>
                  <img src={img2} className={styles.book_img}></img>
                  <div>
                    <div className={styles.book_name}>Engineering Graph..</div>
                    <div className={styles.book_subhead}>J. Benjamin</div>
                  </div>
                </div>
                <div className={styles.book}>
                  <img src={img3} className={styles.book_img}></img>
                  <div>
                    <div className={styles.book_name}>Engineering Physics</div>
                    <div className={styles.book_subhead}>S. Chand</div>
                  </div>
                </div>
                <div className={styles.book}>
                  <img src={img4} className={styles.book_img}></img>
                  <div>
                    <div className={styles.book_name}>Basic Civil Engin..</div>
                    <div className={styles.book_subhead}>Shibu Nalpat</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.category_recomm}>
              <div className={styles.books_head}>
                <div className={styles.recommend}>Recommend</div>
                <div className={styles.btn_more}>
                  <div className={styles.btn_moretxt}>More</div>
                  <FaGreaterThan className={styles.greaterthan_icon} />
                </div>
              </div>
              <div className={styles.category_options}>
                <button className={styles.category_btn}>All</button>
                <button className={styles.category_btn}>Text Book</button>
                <button className={styles.category_btn}>Note Book</button>
                <button className={styles.category_btn}>
                  Supply Materials
                </button>
                <button className={styles.category_btn}>Lab Materials</button>
              </div>
              <div className={styles.category_list}>
                <div className={styles.category}>
                  <img src={img5} className={styles.category_img}></img>
                  <div className={styles.cat_name_name}>Physics Notebook</div>
                </div>
                <div className={styles.category}>
                  <img src={img6} className={styles.category_img}></img>
                  <div className={styles.cat_name_name}>Mini Drafter</div>
                </div>
                <div className={styles.category}>
                  <img src={img7} className={styles.category_img}></img>
                  <div className={styles.cat_name_name}>Civil Lab Coat</div>
                </div>
                <div className={styles.category}>
                  <img src={img8} className={styles.category_img}></img>
                  <div className={styles.cat_name_name}>Chemistry Notebook</div>
                </div>
                <div className={styles.category}>
                  <img src={img9} className={styles.category_img}></img>
                  <div className={styles.cat_name_name}>DBMS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightcol}>
          <RightNav />
        </div>
      </div>
    </div>
  );
};

export default Recomm;
