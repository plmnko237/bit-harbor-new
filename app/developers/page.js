import Link from "next/link";

export default function developers() {
  return (
    <main className="developers">
      <h2>BitHarbor의 개발자들을 소개합니다!🎉</h2>
      <div className="devCon">
        <div className="front">
          <h4>Front-end 🙋‍♀️</h4>
          <div className="profile">
            <img src="/front-end.jpg" alt="front-end" />
          </div>
          <div className="dev-info">
            <ul>
              <li>
                <b>• name :</b> 민혜성
              </li>
              <li className="git">
                <b>• git hub :</b>{" "}
                <Link href={"https://github.com/plmnko237/bit-harbor-new"}>
                  <img src="/git.jpg" alt="깃허브" />
                </Link>
              </li>
              <li style={{ textTransform: "none" }}>
                <b>• Email :</b> plmnko237@gmail.com
              </li>
              <li>
                <b>• skill</b>{" "}
                <span>
                  figma, photoshop, illustration, HTML5, CSS3, javascript,
                  jQuery, React.js, Next.js, NextAuth
                </span>
              </li>
              <li>
                <b>• task</b>
                <span>
                  홈페이지의 전반적인 디자인 및 마크업, 반응형 작업,
                  Front-end담당
                </span>
              </li>
            </ul>
          </div>
          <div className="dev-info">
            <h5 style={{ textAlign: "center", marginBottom: "10px" }}>
              인사말
            </h5>
            <div className="greeting">
              안녕하세요! BitHarbor의 디자인과 front-end를 맡은 민혜성입니다.
              <br />
              BitHarbor는 React.js와 Next.js를 활용하여 만든 첫 프로젝트입니다.
              게시판 위주의 커뮤니티 사이트를 제작하는것이 처음이라 난관에
              부딪혀 며칠을 고전하기도 하고 디자인부터 Front-end까지 맡아
              작업하다보니 작업량이 많아 힘든 순간도 있었지만, 좋은 Back-end
              개발자 상래님 덕분에 어려운 작업도 즐겁게 헤쳐나갈 수 있었습니다.
              <br />
              열심히 작업한 만큼 추후 꾸준하게 다양한 기능들을 업데이트 하고
              싶습니다. 사이트를 이용하시면서 발생하는 문제나 피드백, 개발에
              관련된 문의와 컨텍을 원하시는 분께서는 위의 이메일로 연락주세요!
              확인 후 빠른 시일 내에 연락드리겠습니다.
              <br />
              저희 사이트에 방문해주셔서 감사드리며 오늘도 좋은 하루 보내시길
              바랍니다.😉
            </div>
          </div>
        </div>
        <div className="back">
          <h4>Back-end 🙋‍♂️</h4>
          <div className="profile">
            <img src="/back-end.jpg" alt="back-end" />
          </div>
          <div className="dev-info">
            <ul>
              <li>
                <b>• name :</b> 김상래
              </li>
              <li className="git">
                <b>• git hub :</b>{" "}
                <Link
                  href={"https://github.com/project-Bitharbor/Bitharbor_server"}
                >
                  <img src="/git.jpg" alt="깃허브" />
                </Link>
              </li>
              <li style={{ textTransform: "none" }}>
                <b>• Email :</b> sangrae.backend@gmail.com
              </li>
              <li>
                <b>• skill</b>
                <span>
                  Java, SpringBoot, MySQL, AWS(EC2, RDS, S3, Route53,
                  CodeDeploy),GitHub Actions, JPA
                </span>
              </li>
              <li>
                <b>• task </b>
                <span>홈페이지 구현을 위한 서버 구축 및 배포(Back-end)</span>
              </li>
            </ul>
          </div>
          <div className="dev-info">
            <h5 style={{ textAlign: "center", marginBottom: "10px" }}>
              인사말
            </h5>
            <div className="greeting">
              안녕하세요! BitHarbor의 Back-end를 맡은 김상래입니다.
              <br />
              BitHarbor는 Java 및 SpringBoot를 활용하여 처음으로 백엔드의 담당
              업무을 혼자 진행해 본 값진 프로젝트입니다.
              <br />
              프론트엔드를 담당해주신 혜성님께서 디자인 및 프론트엔드 쪽의
              작업을 수월하게 해주신 덕분에 어려운 부분을 같이 해결할 수 있었고
              Next.js로 작업해주신 덕분에 기존과는 다른 방법의 프로젝트도 경험할
              수 있었습니다.
              <br />
              열심히 작업한 만큼 만족스러운 결과가 나왔지만, 새로운 기능을
              추가하거나, 부족한 부분을 보완하는 작업을 추후에 진행하고
              싶습니다.
              <br />
              백엔드에 관련 된 질문은 위의 메일로 문의주시면 빠른 시일 내
              답변드리도록 하겠습니다. 저희 홈페이지 방문에 대단히 감사드리며,
              아낌없는 피드백 주시면 감사하겠습니다.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
