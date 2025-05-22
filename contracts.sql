--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contracts; Type: TABLE; Schema: public; Owner: kingfrankhood
--

CREATE TABLE public.contracts (
    "timestamp" timestamp without time zone,
    contract_address character varying(42),
    status character varying(50),
    transaction_hash character varying(66),
    token_symbol character varying(20),
    initial_supply bigint,
    deployed_on_chain boolean,
    add_token_to_wallet boolean
);


ALTER TABLE public.contracts OWNER TO kingfrankhood;

--
-- PostgreSQL database dump complete
--

