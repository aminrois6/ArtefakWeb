-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Jul 2022 pada 01.47
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `akses`
--

CREATE TABLE `akses` (
  `id_akses` int(11) NOT NULL,
  `id_role_project` int(11) NOT NULL,
  `id_jenis` int(11) NOT NULL,
  `read` varchar(10) NOT NULL,
  `update` varchar(10) NOT NULL,
  `delete` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `artefak_project`
--

CREATE TABLE `artefak_project` (
  `id_artefak` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `id_versi` int(11) NOT NULL,
  `nama_artefak` varchar(50) NOT NULL,
  `deskripsi_artefak` text NOT NULL,
  `id_jenis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `artefak_project`
--

INSERT INTO `artefak_project` (`id_artefak`, `id_project`, `id_versi`, `nama_artefak`, `deskripsi_artefak`, `id_jenis`) VALUES
(1, 2, 1, 'File', 'Mencoba File', 2),
(2, 2, 1, 'coba2', '', 3),
(3, 2, 1, 'coba res', 'coba coba', 2),
(4, 2, 1, 'File Download', 'Mencoba Download File', 2),
(5, 2, 1, 'Download', 'Download', 2),
(6, 2, 1, 'coba4a', 'sa', 2),
(7, 2, 1, 'design coba', ' ', 4),
(8, 2, 1, 'design coba2', ' ', 4),
(9, 2, 1, 'design coba3', ' ', 4),
(10, 17, 1, 'cuci tangan', ' ', 2),
(11, 17, 1, 'Ngambil Pangan', ' ', 2),
(12, 17, 1, 'Ngambil Lauk', ' ', 2),
(13, 4, 1, 'apa coba', ' ', 2),
(14, 4, 1, 'isi sendiri', ' ', 4),
(15, 2, 1, 'design coba 4', ' ', 4),
(16, 4, 1, 'sd', ' ', 5),
(18, 2, 1, 'Proses Pembuatan Login', ' ', 4),
(19, 2, 1, 'Terserah Lahs', 's', 5),
(20, 2, 1, 'ada', ' ', 5),
(21, 17, 1, 'atas', ' ', 4),
(22, 2, 1, 'coba', ' ', 2),
(23, 20, 1, 'coba', ' ', 2),
(24, 20, 1, 'coba2', ' ', 2),
(25, 28, 1, 'coba', ' ', 2),
(26, 2, 1, 'coba11', 'ini coba', 5),
(27, 2, 1, 'coba membuat', '', 2),
(28, 29, 1, 'bisa', '', 2),
(29, 30, 1, 'ada', '', 2),
(30, 2, 1, 'coba lagi', 'percobaan upload berhasil', 5),
(31, 2, 1, 'tahap realease', '', 6),
(33, 2, 1, 'lagi', '', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `backlog`
--

CREATE TABLE `backlog` (
  `id_backlog` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `id_versi` int(11) NOT NULL,
  `isi_backlog` varchar(20) NOT NULL,
  `status_backlog` varchar(10) NOT NULL,
  `jenis_backlog` varchar(10) NOT NULL,
  `priority_backlog` varchar(20) NOT NULL,
  `order_backlog` varchar(20) NOT NULL,
  `id_jenis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `berkas`
--

CREATE TABLE `berkas` (
  `id_berkas` int(11) NOT NULL,
  `id_artefak` int(11) NOT NULL,
  `nama_berkas` varchar(100) NOT NULL,
  `isi_berkas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `berkas`
--

INSERT INTO `berkas` (`id_berkas`, `id_artefak`, `nama_berkas`, `isi_berkas`) VALUES
(5, 1, 'img125.pdf', 'artefak/3gdboLAAnS7VvNDETgOfDEnZvVcKgxdh3u1m0Pok.pdf'),
(6, 1, 'Capture.PNG', 'artefak/t9RFUCxY57hUt0WvR4xmNibw0SM70kxyNeaTTkqz.png'),
(8, 1, 'Paspor.doc', 'artefak/xyRG4Uxh4EVhhpKIeJEvUNKdm3NGQw1O2g7jt5S6.doc'),
(13, 3, '4.png', 'artefak/JeBIsvnUhYvfwgxhjCQ0DxjWJQO4YVJHTRgPh40s.png'),
(14, 3, '3.png', 'artefak/T1V7IlcpHWcnMWDGLjInbj6aeoE3dfNxVaZ04C6S.png'),
(15, 30, '70_big.jpg', 'artefak/UH7l3FHDiUAg0ZSnNuOEO3VJlBAVcGYzghPPTYVd.jpeg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `index`
--

CREATE TABLE `index` (
  `id_index` int(11) NOT NULL,
  `id_berkas` int(11) NOT NULL,
  `kata` varchar(20) NOT NULL,
  `frek` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invite`
--

CREATE TABLE `invite` (
  `id_invite` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `date_sent` date NOT NULL,
  `date_accept` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `invite`
--

INSERT INTO `invite` (`id_invite`, `id_user1`, `id_user2`, `id_project`, `date_sent`, `date_accept`) VALUES
(2, 1, 2, 2, '2019-07-01', '2019-07-17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_artefak`
--

CREATE TABLE `jenis_artefak` (
  `id_jenis` int(11) NOT NULL,
  `nama_jenis` varchar(20) NOT NULL,
  `id_sdlc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `jenis_artefak`
--

INSERT INTO `jenis_artefak` (`id_jenis`, `nama_jenis`, `id_sdlc`) VALUES
(2, 'Analisa', 1),
(3, 'Backlog', 3),
(4, 'Design', 1),
(5, 'Proses', 1),
(6, 'Release', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `member_project`
--

CREATE TABLE `member_project` (
  `id_member` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_role_project` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `member_project`
--

INSERT INTO `member_project` (`id_member`, `id_project`, `id_user`, `id_role_project`) VALUES
(2, 2, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `project`
--

CREATE TABLE `project` (
  `id_project` int(11) NOT NULL,
  `nama_project` varchar(20) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_sdlc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `project`
--

INSERT INTO `project` (`id_project`, `nama_project`, `id_user`, `id_sdlc`) VALUES
(2, 'VSM', 1, 1),
(3, 'Diagram', 1, 3),
(4, 'VSM', 1, 1),
(12, 'coba1', 3, 1),
(13, 'coba 2', 3, 1),
(14, 'coba 2', 3, 1),
(17, 'Makanan', 1, 1),
(19, 'coba4', 1, 3),
(20, 'coba5', 1, 1),
(24, 'coba10', 1, 3),
(25, 'coba11', 1, 3),
(26, 'coba12', 1, 1),
(27, 'coba13', 1, 3),
(28, 'Amin Rois', 2, 1),
(29, 'coba', 8, 1),
(30, 'coba', 9, 1),
(31, 'artef', 16, 1),
(32, 'ketiga', 16, 3),
(34, 'mana lagi', 1, 3),
(35, 'coba lagi', 1, 3),
(37, 'mana lagi', 1, 3),
(38, 'mana lagi', 1, 3),
(39, 'mana lagi 2', 1, 3),
(41, 'ayo', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_project`
--

CREATE TABLE `role_project` (
  `id_role_project` int(11) NOT NULL,
  `nama_role_project` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `role_project`
--

INSERT INTO `role_project` (`id_role_project`, `nama_role_project`) VALUES
(1, 'Analisis');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sdlc`
--

CREATE TABLE `sdlc` (
  `id_sdlc` int(11) NOT NULL,
  `nama_sdlc` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `sdlc`
--

INSERT INTO `sdlc` (`id_sdlc`, `nama_sdlc`) VALUES
(1, 'Waterfall'),
(3, 'Scrum');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `email_user` varchar(50) NOT NULL,
  `password_user` varchar(20) NOT NULL,
  `nama_user` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `email_user`, `password_user`, `nama_user`) VALUES
(1, 'aminrois@gmail.com', '123', 'aminrois'),
(2, 'amin12@gmail.com', '123', 'rois'),
(3, 'amin123@gmail.com', '123', 'amin123'),
(4, 'amin212@gmail.com', '123', 'amin'),
(5, 'coba@gmail.com', '123', 'coba 5'),
(6, 'kocak@gmail.com', '123', 'kocak'),
(7, 'kocak2', '123', 'kocak2'),
(8, 'roisamin@gmail.com', '123', 'Rois Amin'),
(9, 'aminrois6@gmail.com', '123', 'AR20 Gaming'),
(10, 'rois123@gmail.com', '123', 'rois'),
(11, 'coba2@gmail.com', '123', 'coba'),
(12, 'cobacoba2@gmail.com', '123', 'cobacoba2'),
(13, 'coba3@gmail.com', '123', 'cobacoba3'),
(14, 'ketiga@gmail.com', '123', 'ketiga'),
(15, 'cobalah@gmail.com', '123', 'cobalah'),
(16, 'aminrois265@gmail.com', '123', 'Rois Amin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `versi`
--

CREATE TABLE `versi` (
  `id_versi` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `major` varchar(11) NOT NULL,
  `minor` varchar(11) NOT NULL,
  `patch` varchar(11) NOT NULL,
  `fase_release` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `versi`
--

INSERT INTO `versi` (`id_versi`, `id_project`, `major`, `minor`, `patch`, `fase_release`) VALUES
(1, 3, '1', '0', '0', 'coba');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `akses`
--
ALTER TABLE `akses`
  ADD PRIMARY KEY (`id_akses`),
  ADD KEY `id_jenis` (`id_jenis`),
  ADD KEY `id_role_project` (`id_role_project`) USING BTREE;

--
-- Indeks untuk tabel `artefak_project`
--
ALTER TABLE `artefak_project`
  ADD PRIMARY KEY (`id_artefak`),
  ADD KEY `id_project` (`id_project`),
  ADD KEY `id_versi` (`id_versi`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indeks untuk tabel `backlog`
--
ALTER TABLE `backlog`
  ADD PRIMARY KEY (`id_backlog`),
  ADD KEY `id_project` (`id_project`),
  ADD KEY `id_versi` (`id_versi`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indeks untuk tabel `berkas`
--
ALTER TABLE `berkas`
  ADD PRIMARY KEY (`id_berkas`),
  ADD KEY `id_artefak` (`id_artefak`);

--
-- Indeks untuk tabel `index`
--
ALTER TABLE `index`
  ADD PRIMARY KEY (`id_index`),
  ADD KEY `id_berkas` (`id_berkas`) USING BTREE;

--
-- Indeks untuk tabel `invite`
--
ALTER TABLE `invite`
  ADD PRIMARY KEY (`id_invite`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`),
  ADD KEY `id_project` (`id_project`);

--
-- Indeks untuk tabel `jenis_artefak`
--
ALTER TABLE `jenis_artefak`
  ADD PRIMARY KEY (`id_jenis`),
  ADD KEY `id_sdlc` (`id_sdlc`);

--
-- Indeks untuk tabel `member_project`
--
ALTER TABLE `member_project`
  ADD PRIMARY KEY (`id_member`),
  ADD KEY `id_project` (`id_project`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_role_project` (`id_role_project`) USING BTREE;

--
-- Indeks untuk tabel `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id_project`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_sdlc` (`id_sdlc`);

--
-- Indeks untuk tabel `role_project`
--
ALTER TABLE `role_project`
  ADD PRIMARY KEY (`id_role_project`);

--
-- Indeks untuk tabel `sdlc`
--
ALTER TABLE `sdlc`
  ADD PRIMARY KEY (`id_sdlc`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `versi`
--
ALTER TABLE `versi`
  ADD PRIMARY KEY (`id_versi`),
  ADD KEY `id_project` (`id_project`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `akses`
--
ALTER TABLE `akses`
  MODIFY `id_akses` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `artefak_project`
--
ALTER TABLE `artefak_project`
  MODIFY `id_artefak` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `backlog`
--
ALTER TABLE `backlog`
  MODIFY `id_backlog` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `berkas`
--
ALTER TABLE `berkas`
  MODIFY `id_berkas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `index`
--
ALTER TABLE `index`
  MODIFY `id_index` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `invite`
--
ALTER TABLE `invite`
  MODIFY `id_invite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `jenis_artefak`
--
ALTER TABLE `jenis_artefak`
  MODIFY `id_jenis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `member_project`
--
ALTER TABLE `member_project`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `project`
--
ALTER TABLE `project`
  MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `role_project`
--
ALTER TABLE `role_project`
  MODIFY `id_role_project` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `sdlc`
--
ALTER TABLE `sdlc`
  MODIFY `id_sdlc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `versi`
--
ALTER TABLE `versi`
  MODIFY `id_versi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `akses`
--
ALTER TABLE `akses`
  ADD CONSTRAINT `akses_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_artefak` (`id_jenis`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `akses_ibfk_2` FOREIGN KEY (`id_role_project`) REFERENCES `role_project` (`id_role_project`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `artefak_project`
--
ALTER TABLE `artefak_project`
  ADD CONSTRAINT `artefak_project_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_artefak` (`id_jenis`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `artefak_project_ibfk_2` FOREIGN KEY (`id_versi`) REFERENCES `versi` (`id_versi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `artefak_project_ibfk_3` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `backlog`
--
ALTER TABLE `backlog`
  ADD CONSTRAINT `backlog_ibfk_1` FOREIGN KEY (`id_versi`) REFERENCES `versi` (`id_versi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `backlog_ibfk_2` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_artefak` (`id_jenis`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `backlog_ibfk_3` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `berkas`
--
ALTER TABLE `berkas`
  ADD CONSTRAINT `berkas_ibfk_1` FOREIGN KEY (`id_artefak`) REFERENCES `artefak_project` (`id_artefak`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `index`
--
ALTER TABLE `index`
  ADD CONSTRAINT `index_ibfk_1` FOREIGN KEY (`id_berkas`) REFERENCES `berkas` (`id_berkas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invite`
--
ALTER TABLE `invite`
  ADD CONSTRAINT `invite_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invite_ibfk_2` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invite_ibfk_3` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jenis_artefak`
--
ALTER TABLE `jenis_artefak`
  ADD CONSTRAINT `jenis_artefak_ibfk_1` FOREIGN KEY (`id_sdlc`) REFERENCES `sdlc` (`id_sdlc`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `member_project`
--
ALTER TABLE `member_project`
  ADD CONSTRAINT `member_project_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `member_project_ibfk_2` FOREIGN KEY (`id_role_project`) REFERENCES `role_project` (`id_role_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `member_project_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`id_sdlc`) REFERENCES `sdlc` (`id_sdlc`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `versi`
--
ALTER TABLE `versi`
  ADD CONSTRAINT `versi_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
